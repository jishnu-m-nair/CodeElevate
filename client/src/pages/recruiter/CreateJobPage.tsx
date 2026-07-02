import RecruiterLayout from '../../layouts/RecruiterLayout';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createJobService } from "../../services/job.service";


interface JobFormValues {
  title: string;
  role: string;
  skills: string;
  minSalary: number;
  minSalaryUnit: "Lakhs" | "Crores";
  maxSalary: number;
  maxSalaryUnit: "Lakhs" | "Crores";
  expYears: number;
  expMonths: number;
  jobType: string;
  location: string;
  lastDate: string;
  description: string;
}

const JobSchema = Yup.object({
  title: Yup.string().required("Job title is required"),
  role: Yup.string().required("Role is required"),
  skills: Yup.string().required("Skills required"),
  expYears: Yup.number().typeError("Must be a number").min(0, "Cannot be negative").required("Required"),
  expMonths: Yup.number().min(0).max(11, "Months must be 0-11").required("Required"),
  jobType: Yup.string().required("Job type required"),
  location: Yup.string().required("Location required"),
  description: Yup.string().required("Description required"),
  minSalary: Yup.number().typeError("Must be a number").positive("Must be positive").required("Min salary required"),
  minSalaryUnit: Yup.string().required(),
  maxSalary: Yup.number()
    .typeError("Must be a number")
    .required("Max salary required")
    .test("is-greater", "Max salary must be greater than Min salary", function (value) {
      const { minSalary, minSalaryUnit, maxSalaryUnit } = this.parent;
      if (!value || !minSalary) return true;

      const minMultiplier = minSalaryUnit === "Crores" ? 10000000 : 100000;
      const maxMultiplier = maxSalaryUnit === "Crores" ? 10000000 : 100000;

      return (value * maxMultiplier) >= (minSalary * minMultiplier);
    }),
  maxSalaryUnit: Yup.string().required(),
  lastDate: Yup.date()
    .typeError("Invalid date format")
    .required("Deadline required")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)), 
      "Deadline must be today or a future date"
    ),
});

export default function JobPostMain() {
  const formik = useFormik<JobFormValues>({
    initialValues: {
      title: "",
      role: "",
      skills: "",
      minSalary: 1,
      minSalaryUnit: "Lakhs",
      maxSalary: 1,
      maxSalaryUnit: "Lakhs",
      expYears: 0,
      expMonths: 0,
      jobType: "",
      location: "",
      lastDate: "",
      description: "",
    },
    validationSchema: JobSchema,
    onSubmit: async (values) => {
      try {
        const minMultiplier =
          values.minSalaryUnit === "Crores" ? 10000000 : 100000;
        const maxMultiplier =
          values.maxSalaryUnit === "Crores" ? 10000000 : 100000;

        const payload = {
          title: values.title,
          role: values.role,
          skills: values.skills,
          jobType: values.jobType,
          location: values.location,
          lastDate: values.lastDate,
          description: values.description,

          totalExperienceMonths:
            Number(values.expYears) * 12 + Number(values.expMonths),

          rawMinSalary: Number(values.minSalary) * minMultiplier,
          rawMaxSalary: Number(values.maxSalary) * maxMultiplier,
        };

        const res = await createJobService(payload);

        console.log("Job Created:", res);
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <RecruiterLayout>
      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Post a Job</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <input
              name="title"
              placeholder="Job Title"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="w-full border p-2 rounded"
            />
            {formik.touched.title && formik.errors.title && <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>}
          </div>

          <div>
            <input
              name="role"
              placeholder="Job Role"
              onChange={formik.handleChange}
              value={formik.values.role}
              className="w-full border p-2 rounded"
            />
            {formik.touched.role && formik.errors.role && <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>}
          </div>

          <div>
            <input
              name="skills"
              placeholder="Skills (React, Node, MongoDB...)"
              onChange={formik.handleChange}
              value={formik.values.skills}
              className="w-full border p-2 rounded"
            />
            {formik.touched.skills && formik.errors.skills && <p className="text-red-500 text-sm mt-1">{formik.errors.skills}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary</label>
              <div className="flex rounded-md shadow-sm">
                <input
                  name="minSalary"
                  type='number'
                  placeholder="e.g. 4.5"
                  onChange={formik.handleChange}
                  value={formik.values.minSalary}
                  className="flex-1 border p-2 rounded-l border-r-0 w-full"
                />
                <select
                  name="minSalaryUnit"
                  onChange={formik.handleChange}
                  value={formik.values.minSalaryUnit}
                  className="border p-2 rounded-r bg-gray-50 text-sm"
                >
                  <option value="Lakhs">Lakhs (LPA)</option>
                  <option value="Crores">Crores (Cr)</option>
                </select>
              </div>
              {formik.touched.minSalary && formik.errors.minSalary && <p className="text-red-500 text-sm mt-1">{formik.errors.minSalary}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Salary</label>
              <div className="flex rounded-md shadow-sm">
                <input
                  name="maxSalary"
                  type='number'
                  placeholder="e.g. 12"
                  onChange={formik.handleChange}
                  value={formik.values.maxSalary}
                  className="flex-1 border p-2 rounded-l border-r-0 w-full"
                />
                <select
                  name="maxSalaryUnit"
                  onChange={formik.handleChange}
                  value={formik.values.maxSalaryUnit}
                  className="border p-2 rounded-r bg-gray-50 text-sm"
                >
                  <option value="Lakhs">Lakhs (LPA)</option>
                  <option value="Crores">Crores (Cr)</option>
                </select>
              </div>
              {formik.touched.maxSalary && formik.errors.maxSalary && <p className="text-red-500 text-sm mt-1">{formik.errors.maxSalary}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Experience</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  name="expYears"
                  type="number"
                  placeholder="Years (e.g. 2)"
                  onChange={formik.handleChange}
                  value={formik.values.expYears}
                  className="w-full border p-2 rounded"
                />
                {formik.touched.expYears && formik.errors.expYears && <p className="text-red-500 text-sm mt-1">{formik.errors.expYears}</p>}
              </div>
              <div>
                <select
                  name="expMonths"
                  value={formik.values.expMonths}
                  onChange={(e) =>
                    formik.setFieldValue("expMonths", Number(e.target.value))
                  }
                  onBlur={formik.handleBlur}
                  className="w-full border p-2 rounded bg-white"
                >
                  <option value={0}>0 Months</option>
                  {[...Array(11)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Months
                    </option>
                  ))}
                </select>
                {formik.touched.expMonths && formik.errors.expMonths && <p className="text-red-500 text-sm mt-1">{formik.errors.expMonths}</p>}
              </div>
            </div>
          </div>

          <div>
            <select
              name="jobType"
              onChange={formik.handleChange}
              value={formik.values.jobType}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
            {formik.touched.jobType && formik.errors.jobType && <p className="text-red-500 text-sm mt-1">{formik.errors.jobType}</p>}
          </div>

          <div>
            <input
              name="location"
              placeholder="Location (e.g. Bangalore / Remote)"
              onChange={formik.handleChange}
              value={formik.values.location}
              className="w-full border p-2 rounded"
            />
            {formik.touched.location && formik.errors.location && <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>}
          </div>

          <div>
            <input
              type="date"
              name="lastDate"
              onChange={formik.handleChange}
              value={formik.values.lastDate}
              className="w-full border p-2 rounded"
            />
            {formik.touched.lastDate && formik.errors.lastDate && <p className="text-red-500 text-sm mt-1">{formik.errors.lastDate}</p>}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Job Description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-full border p-3 rounded h-32"
            />
            {formik.touched.description && formik.errors.description && <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>}
          </div>

          <button
            type="submit"
            onClick={() => {
              console.log("CLICKED");
              console.log("ERRORS:", formik.errors);
              console.log("VALUES:", formik.values);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </RecruiterLayout>
  );
}

// import RecruiterLayout from '../../layouts/RecruiterLayout';
// import { useFormik } from "formik";
// import * as Yup from "yup";

// interface JobFormValues {
//   title: string;
//   role: string;
//   skills: string;
//   minSalary: string;
//   maxSalary: string;
//   experience: string;
//   jobType: string;
//   location: string;
//   lastDate: string;
//   description: string;
// }

// const JobSchema = Yup.object({
//   title: Yup.string().required("Job title is required"),
//   role: Yup.string().required("Role is required"),
//   skills: Yup.string().required("Skills required"),
//   experience: Yup.string().required("Experience required"),
//   jobType: Yup.string().required("Job type required"),
//   location: Yup.string().required("Location required"),
//   lastDate: Yup.date().required("Deadline required"),
//   description: Yup.string().required("Description required"),
//   minSalary: Yup.number().typeError("Must be number").nullable(),
//   maxSalary: Yup.number()
//     .typeError("Must be number")
//     .nullable()
//     .min(Yup.ref("minSalary"), "Max must be greater than Min"),
// });

// export default function JobPostMain() {
//   const formik = useFormik<JobFormValues>({
//     initialValues: {
//       title: "",
//       role: "",
//       skills: "",
//       minSalary: "",
//       maxSalary: "",
//       experience: "",
//       jobType: "",
//       location: "",
//       lastDate: "",
//       description: "",
//     },
//     validationSchema: JobSchema,
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   return (
//     <RecruiterLayout>
//       <div className="p-6 bg-white rounded-xl shadow-md">
//         <h2 className="text-2xl font-semibold mb-6">Post a Job</h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-5">

//           {/* Title */}
//           <input
//             name="title"
//             placeholder="Job Title"
//             onChange={formik.handleChange}
//             value={formik.values.title}
//             className="w-full border p-2 rounded"
//           />

//           {/* Role */}
//           <input
//             name="role"
//             placeholder="Job Role"
//             onChange={formik.handleChange}
//             value={formik.values.role}
//             className="w-full border p-2 rounded"
//           />

//           {/* Skills */}
//           <input
//             name="skills"
//             placeholder="Skills (React, Node, MongoDB...)"
//             onChange={formik.handleChange}
//             value={formik.values.skills}
//             className="w-full border p-2 rounded"
//           />

//           {/* Salary */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="minSalary"
//               placeholder="Min Salary"
//               onChange={formik.handleChange}
//               value={formik.values.minSalary}
//               className="border p-2 rounded"
//             />
//             <input
//               name="maxSalary"
//               placeholder="Max Salary"
//               onChange={formik.handleChange}
//               value={formik.values.maxSalary}
//               className="border p-2 rounded"
//             />
//           </div>

//           {/* Experience + Job Type */}
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="experience"
//               placeholder="Experience (e.g. 2+ years)"
//               onChange={formik.handleChange}
//               value={formik.values.experience}
//               className="border p-2 rounded"
//             />

//             <select
//               name="jobType"
//               onChange={formik.handleChange}
//               value={formik.values.jobType}
//               className="border p-2 rounded"
//             >
//               <option value="">Select Job Type</option>
//               <option value="full-time">Full-time</option>
//               <option value="part-time">Part-time</option>
//               <option value="internship">Internship</option>
//               <option value="contract">Contract</option>
//             </select>
//           </div>

//           {/* Location */}
//           <input
//             name="location"
//             placeholder="Location (e.g. Bangalore / Remote)"
//             onChange={formik.handleChange}
//             value={formik.values.location}
//             className="w-full border p-2 rounded"
//           />

//           {/* Deadline */}
//           <input
//             type="date"
//             name="lastDate"
//             onChange={formik.handleChange}
//             value={formik.values.lastDate}
//             className="w-full border p-2 rounded"
//           />

//           {/* Description */}
//           <textarea
//             name="description"
//             placeholder="Job Description"
//             onChange={formik.handleChange}
//             value={formik.values.description}
//             className="w-full border p-3 rounded h-32"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded"
//           >
//             Post Job
//           </button>
//         </form>
//       </div>
//     </RecruiterLayout>
//   );
// }