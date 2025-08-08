import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-800 px-4">
      <img
        src="https://i.ibb.co/bRNbgNMY/download-1.jpg"
        alt="404 Not Found"
        className="w-48 sm:w-64 md:w-72 lg:w-96 mb-6"
      />
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center px-2">404 - Page Not Found</h1>
      <p className="text-center text-base sm:text-lg mb-6 px-2 max-w-md">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm sm:text-base"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
