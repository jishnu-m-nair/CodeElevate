import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">
        Oops! Page not found
      </h2>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;