import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  title: string;
  subtitle?: string;
  submitText?: string;

  showGoogleLogin?: boolean;
  showSignupLink?: boolean;
  showForgotPassword?: boolean;
  signupPath?: string;

  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  onGoogleLogin?: () => void;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).required("Required"),
});

export default function LoginForm({
  title,
  subtitle,
  submitText = "Login",
  showGoogleLogin = false,
  showSignupLink = false,
  showForgotPassword = false,
  onSubmit,
  onGoogleLogin,
  signupPath
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik<LoginFormValues>
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-gray-400">{subtitle}</p>}
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-400 text-sm mt-1"
            />
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
              className="text-red-400 text-sm mt-1"
            />
          </div>

          {showForgotPassword && (
            <Link to="/forgot-password" className="text-sm text-blue-500">
              Forgot password?
            </Link>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {isSubmitting ? "Logging in..." : submitText}
          </button>

          {showGoogleLogin && (
            <>
              <div className="text-center text-gray-400">or</div>
              <button
                type="button"
                onClick={onGoogleLogin}
                className="w-full py-3 bg-white text-gray-800 rounded-lg"
              >
                Google Login
              </button>
            </>
          )}

          {showSignupLink && signupPath && (
            <div className="text-center text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to={signupPath} className="text-blue-500 font-semibold">
                Sign up
              </Link>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
