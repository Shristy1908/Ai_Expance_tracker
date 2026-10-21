import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <Link to="/dashboard" className="font-bold text-gray-900 no-underline">
        Expense Tracker
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        {isAuthenticated ? (
          <>
            <span className="text-gray-700">{user?.name}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="h-9 px-3.5 rounded-lg border border-gray-200 bg-transparent hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
