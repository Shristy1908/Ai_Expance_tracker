import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getInitial } from "../utils/format.js";
import { LogOutIcon, WalletIcon } from "./Icons.jsx";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-8">
        <Link to="/dashboard" className="flex items-center gap-2.5 no-underline">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-600/30">
            <WalletIcon className="size-5" />
          </span>
          <span className="font-bold text-gray-900">Expense Tracker</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <span className="hidden items-center gap-2 sm:flex">
                <span className="flex size-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                  {getInitial(user?.name)}
                </span>
                <span className="font-medium text-gray-700">{user?.name}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <LogOutIcon className="size-4" />
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
      </div>
    </header>
  );
};

export default Header;
