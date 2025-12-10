import { useAuth } from "@/auth";
import { useNavigate } from "react-router-dom";
import { TodoBoard } from "./components/TodoBoard";

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
    <div className="min-h-screen flex flex-col bg-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto h-full">
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

      <main className="w-7xl mx-auto py-4 flex flex-1 flex-col">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Welcome, {user?.firstName} {user?.lastName}!
        </h2>
        <TodoBoard />
      </main>
    </div>
  );
};

export default DashboardPage;
