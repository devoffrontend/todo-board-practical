import { useAuth } from "@/auth";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Todo Board
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {isAuthenticated
            ? `Hello, ${user?.firstName} ${user?.lastName}!`
            : "Get started by logging in."}
        </p>
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
