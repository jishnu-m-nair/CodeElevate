import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bell, Menu, User, Mail, Phone, Edit2 } from 'lucide-react';
import ChangeUserPassword from '../../components/user/ChangePassword';
import { fetchProfileService, updateProfileService } from '../../services/userProfile.service';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { getUserProfile, updateUserProfile } from '../../store/slices/userSlice';
import { Link } from 'react-router-dom';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';

export default function ProfilePage() {

  const profileValidationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(2, "Name is too short")
      .max(50, "Name cannot exceed 50 characters")
      .matches(/^[a-zA-Z\s-]+$/, "Name can only contain letters and hyphens"),

    username: Yup.string()
      .trim()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .matches(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscores"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian phone number")
      .length(10, "Phone number must be exactly 10 digits"),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile)!;
  const isLocalUser = profile?.providers?.includes('local');

  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      username: profile?.username || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
    },
    validationSchema: profileValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const { user, message } = await updateProfileService({
          name: values.name,
          username: values.username,
          phone: values.phone,
        });

        if (user) {
          dispatch(updateUserProfile(user));
          toast.success(message);
          setIsEditing(false);
        }
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      }
    },
  });

  const toggleEdit = () => {
    if (isEditing) {
      formik.resetForm();
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchProfileService();
        dispatch(getUserProfile(data));
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <header className="border-b border-gray-800 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/home" ><h1 className="text-xl font-bold text-white">CodeElevate</h1></Link>
          
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-300" />
            <Menu className="w-5 h-5 text-gray-300" />
            <User className="w-5 h-5 text-gray-300" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-[#111111] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-400">@{profile.username}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              {profile.email}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-gray-500" />
              {profile.phone ? profile.phone : "N/A"}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="w-full py-2 bg-purple-600 rounded mb-2"
          >
            Profile
          </button>
          {isLocalUser && (
            <button
              onClick={() => setActiveTab('password')}
              className="w-full py-2 bg-gray-700 rounded"
            >
              Change Password
            </button>
          )}
        </div>

        <div className="lg:col-span-2 bg-[#111111] border border-gray-800 rounded-lg p-8">
          
          {activeTab === 'profile' && (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <input
                  {...formik.getFieldProps('name')}
                  readOnly={!isEditing}
                  className={`w-full p-2 bg-[#1a1a1a] ${formik.touched.name && formik.errors.name ? 'border border-red-500' : ''}`}
                  placeholder="Name"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                )}
              </div>

              <div>
                <input
                  {...formik.getFieldProps('username')}
                  readOnly={!isEditing}
                  className="w-full p-2 bg-[#1a1a1a]"
                  placeholder="Username"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
                )}
              </div>

              <input
                value={formik.values.email}
                readOnly
                className="w-full p-2 bg-[#1a1a1a] opacity-70"
              />

              <div>
                <input
                  {...formik.getFieldProps('phone')}
                  readOnly={!isEditing}
                  className="w-full p-2 bg-[#1a1a1a]"
                  placeholder="Phone"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="bg-gray-700 px-6 py-2 rounded flex items-center gap-2"
                >
                  <Edit2 size={16} />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>

                {isEditing && (
                  <button
                    type="submit"
                    className="bg-purple-600 px-6 py-2 rounded"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                )}
              </div>
            </form>
          )}

          {activeTab === 'password' && isLocalUser ? (
            <ChangeUserPassword />
          ) : activeTab === 'password' ? (
            <div className="text-center py-10">
              <p className="text-gray-400">
                You are logged in via Google. Password management is handled by your provider.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}