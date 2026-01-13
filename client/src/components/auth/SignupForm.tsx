import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface SignupFormProps {
  onSubmit?: (name: string, email: string, password: string, confirmPassword: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(name, email, password, confirmPassword);
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Join us</h2>
        <p className="text-gray-400">Create a CodeElevate account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2
                     focus:ring-blue-500 transition"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2
                     focus:ring-blue-500 transition"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-blue-500 transition"
            required
          />

          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-blue-500 transition"
            required
          />

          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => {
              e.preventDefault();
              setShowConfirmPassword((prev) => !prev);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white
                     font-semibold rounded-lg transition transform hover:scale-[1.02]"
        >
          Sign up
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">or</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignup}
        className="w-full py-3 bg-white hover:bg-gray-100 text-gray-800
                   font-semibold rounded-lg transition flex items-center
                   justify-center space-x-2"
      >
        <span>Google Login</span>
      </button>

      <div className="text-center">
        <span className="text-gray-400">Already have an account? </span>
        <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
