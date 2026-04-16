import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import type { UserRole } from "../../types/authTypes";
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import http from "../../services/http";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../store/slices/userSlice";
import { setAuth } from "../../store/slices/authSlice";
import { toast } from "sonner";

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
  role?: UserRole

  onSubmit: (values: LoginFormValues) => Promise<void> | void;
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
  signupPath,
  role
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
  if (!credentialResponse.credential) return;

  http
    .post('/google-login', { credential: credentialResponse.credential })
    .then((response) => {
      const { data, message } = response.data;
      const { user, accessToken } = data;

      localStorage.setItem('accessToken', accessToken);

      dispatch(
        setAuth({
          accessToken,
          role: user.role,
        })
      );
      console.log('profile', user)
      dispatch(setUserProfile(user));
      toast.success(message);
      navigate('/home');
    })
    .catch((error) => {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'An error occurred during Google login'
      );
    });
};


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
            <>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </button>

              <ForgotPasswordModal
                open={isForgotModalOpen}
                onClose={() => setIsForgotModalOpen(false)}
                role={role}
              />
            </>
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
              <div className="flex justify-center">
                <GoogleLogin
                  type="standard"
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    toast.error("Google login failed");
                  }}
                />
              </div>
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
