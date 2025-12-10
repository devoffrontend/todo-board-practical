import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
