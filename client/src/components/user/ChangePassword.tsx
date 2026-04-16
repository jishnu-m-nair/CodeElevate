import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import { updatePasswordService } from '../../services/userProfile.service';

export default function ChangeUserPassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("Current password is required"),
      
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#^()_\-+=]/, 'Password must contain at least one special character')
      .test('no-spaces', 'Password must not contain spaces', (value) => {
        return value ? !value.includes(' ') : true;
      }),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await updatePasswordService({currentPassword: values.currentPassword, newPassword: values.newPassword});
      
        toast.success("Password updated successfully");
        resetForm();
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      }
    },
  });

  const toggleShow = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-semibold text-white">Change Password</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Current Password</label>
          <div className="relative">
            <input
              {...formik.getFieldProps('currentPassword')}
              type={showPassword.current ? 'text' : 'password'}
              className={`w-full bg-[#1a1a1a] border ${formik.touched.currentPassword && formik.errors.currentPassword ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2.5 text-gray-100 focus:outline-none focus:border-purple-500 pr-10`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => toggleShow('current')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.currentPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">New Password</label>
          <div className="relative">
            <input
              {...formik.getFieldProps('newPassword')}
              type={showPassword.new ? 'text' : 'password'}
              className={`w-full bg-[#1a1a1a] border ${formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2.5 text-gray-100 focus:outline-none focus:border-purple-500 pr-10`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => toggleShow('new')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              {...formik.getFieldProps('confirmPassword')}
              type={showPassword.confirm ? 'text' : 'password'}
              className={`w-full bg-[#1a1a1a] border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2.5 text-gray-100 focus:outline-none focus:border-purple-500 pr-10`}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => toggleShow('confirm')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-md font-medium transition disabled:opacity-50"
          >
            {formik.isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}