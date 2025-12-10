import { useAuth } from "@/auth";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user?.firstName} {user?.lastName}!
          </h2>
          <p className="text-gray-600 mb-6">
            You are successfully authenticated and can access protected routes.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
