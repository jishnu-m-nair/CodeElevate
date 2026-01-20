import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";

interface UserSignupFormProps {
  onSubmit: (values: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export default function UserSignupForm({ onSubmit }: UserSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create account</h2>
            <p className="text-gray-400">Join CodeElevate</p>
          </div>

          <div>
            <Field
              name="name"
              placeholder="Full name"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            />
            <ErrorMessage 
              name="name" 
              component="div" 
              className="text-red-400 text-sm mt-1" />
          </div>
          
          <div>
            <Field
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          />
          <ErrorMessage 
            name="email" 
            component="div" 
            className="text-red-400 text-sm mt-1" />
          </div>
          
          <div className="relative">
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            />
            <button
              type="button"
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
                setShowPassword((p) => !p);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
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
              className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            />
            <button
              type="button"
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
                setShowConfirmPassword((p) => !p);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
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
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Login
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
