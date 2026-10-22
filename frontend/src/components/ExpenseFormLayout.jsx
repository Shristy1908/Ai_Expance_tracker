import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "./Icons.jsx";

// Shared page shell for the Add and Edit expense pages.
const ExpenseFormLayout = ({ icon, title, subtitle, children }) => {
  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-8 sm:py-10">
      <Link
        to="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 no-underline hover:text-gray-900"
      >
        <ArrowLeftIcon className="size-4" />
        Back to dashboard
      </Link>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-600/30">
            {icon}
          </span>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default ExpenseFormLayout;
