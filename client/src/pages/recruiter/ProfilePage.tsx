import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RecruiterLayout from '../../layouts/RecruiterLayout';
import {
  getRecruiterProfileService,
  updateRecruiterProfileService,
} from '../../services/recruiterProfile.service';
import { toast } from 'sonner';
import { setRecruiterProfile, updateRecruiterProfile } from '../../store/slices/recruiterSlice';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function RecruiterProfilePage() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.recruiter.profile);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getRecruiterProfileService();
        dispatch(setRecruiterProfile(data));
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      }
    };

    fetchProfile();
  }, [dispatch]);

  const validationSchema = Yup.object({
    companyName: Yup.string()
      .required('Company name is required')
      .matches(/^[a-zA-Z0-9. -]+$/, 'Invalid company name')
      .max(100),

    companyWebsite: Yup.string().required('Company website is required'),

    linkedInUrl: Yup.string().notRequired(),

    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
      .notRequired(),

    bio: Yup.string().max(300, 'Max 300 characters').notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      companyName: profile?.companyName || '',
      companyWebsite: profile?.companyWebsite || '',
      linkedInUrl: profile?.linkedInUrl || '',
      phone: profile?.phone || '',
      bio: profile?.bio || '',
      email: profile?.email || '',
    },
    enableReinitialize: true,
    validationSchema,

    onSubmit: async (values) => {
      try {
        const payload = {
          companyName: values.companyName,
          companyWebsite: values.companyWebsite,
          linkedInUrl: values.linkedInUrl,
          phone: values.phone,
          bio: values.bio,
        };

        await updateRecruiterProfileService(payload);

        toast.success('Profile updated');
        setIsEditing(false);

        dispatch(updateRecruiterProfile(values));
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

  if (!profile) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return (
    <RecruiterLayout>
      <div className="w-full bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6">Recruiter Profile</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              value={formik.values.email}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 opacity-70"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Company Name</label>
            <input
              {...formik.getFieldProps('companyName')}
              readOnly={!isEditing}
              className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : ''}`}
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <p className="text-red-500 text-sm">{formik.errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Company Website</label>
            <input
              {...formik.getFieldProps('companyWebsite')}
              readOnly={!isEditing}
              className="w-full p-2 border rounded"
            />
            {formik.touched.companyWebsite && formik.errors.companyWebsite && (
              <p className="text-red-500 text-sm">{formik.errors.companyWebsite}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">LinkedIn URL</label>
            <input
              {...formik.getFieldProps('linkedInUrl')}
              readOnly={!isEditing}
              className="w-full p-2 border rounded"
            />
            {formik.touched.linkedInUrl && formik.errors.linkedInUrl && (
              <p className="text-red-500 text-sm">{formik.errors.linkedInUrl}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              {...formik.getFieldProps('phone')}
              readOnly={!isEditing}
              className="w-full p-2 border rounded"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              {...formik.getFieldProps('bio')}
              readOnly={!isEditing}
              className="w-full p-2 border rounded"
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-red-500 text-sm">{formik.errors.bio}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={toggleEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>

            {isEditing && (
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </RecruiterLayout>
  );
}
