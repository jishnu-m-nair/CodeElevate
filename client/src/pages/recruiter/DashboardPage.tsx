import { useNavigate } from "react-router-dom";
import { logoutService } from "../../services/auth.service";
import { useAppDispatch } from "../../store/hooks";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { useState } from "react";

interface ProfileForm {
  company: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<ProfileForm>({
    company: "Global Recruit Pvt. Ltd",
    email: "hr@globalrecruit.com",
    phone: "+91 8403829302",
    location: "Bengaluru",
    bio: "We hired around 100+ employees for top 10 companies in India. Our workplace with one of the best among the tech industry",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved Data:", form);
    // call API here
  };

  const handleLogout = async () => {
    try {
      const redirect = await logoutService(dispatch, 'recruiter');
      toast.success('Recruiter logout success');
      navigate(redirect);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6">Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>

          <LogOut
            size={18}
            className="text-gray-400 cursor-pointer hover:text-red-400 transition"
            onClick={handleLogout}
          />
        </form>
      </div>
    </div>
  );
}

