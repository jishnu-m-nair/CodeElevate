import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";

interface RecruiterSignupFormProps {
  onSubmit: (values: {
    companyName: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export default function RecruiterSignupForm({
  onSubmit,
}: RecruiterSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit({
          companyName: values.companyName,
          email: values.email,
          password: values.password,
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Recruiter registration
            </h2>
            <p className="text-gray-400">Hire talent on CodeElevate</p>
          </div>

          <Field
            name="companyName"
            placeholder="Company name"
            className="auth-input"
          />
          <ErrorMessage name="companyName" component="div" className="text-red-400 text-sm" />

          <Field
            name="email"
            placeholder="Work email"
            className="auth-input"
          />
          <ErrorMessage name="email" component="div" className="text-red-400 text-sm" />

          <div className="relative">
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="auth-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              className="eye-btn"
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
            <ErrorMessage 
              name="password" 
              component="div" 
              className="text-red-400 text-sm mt-1" />
          </div>

          <div className="relative">
            <Field
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="auth-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(p => !p)}
              className="eye-btn"
            >
              {showConfirmPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
            <ErrorMessage 
              name="confirmPassword" 
              component="div" 
              className="text-red-400 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {isSubmitting ? "Creating..." : "Sign up"}
          </button>

          <div className="text-center text-gray-400">
            Want to apply as a user?{" "}
            <Link to="/signup" className="text-blue-500 font-semibold">
              User signup
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
