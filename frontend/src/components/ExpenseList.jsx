import { Link } from "react-router-dom";
import { getCategoryColor } from "../utils/category.js";
import { formatAmount, formatDate, getInitial } from "../utils/format.js";
import { PencilIcon, TrashIcon } from "./Icons.jsx";

export const ExpenseListSkeleton = ({ rows = 4 }) => {
  return (
    <ul className="divide-y divide-gray-100" aria-label="Loading expenses">
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className="flex animate-pulse items-center gap-3 px-4 py-3.5 sm:px-6">
          <span className="size-10 rounded-xl bg-gray-200" />
          <span className="flex-1 space-y-2">
            <span className="block h-3 w-1/3 rounded bg-gray-200" />
            <span className="block h-2.5 w-1/4 rounded bg-gray-100" />
          </span>
          <span className="h-3 w-16 rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
};

const ExpenseList = ({ expenses, onDelete, deletingId }) => {
  return (
    <ul className="divide-y divide-gray-100">
      {expenses.map((expense) => {
        const color = getCategoryColor(expense.category);
        const isDeleting = deletingId === expense.expenseId;
        return (
          <li
            key={expense.expenseId}
            className={`group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-gray-50 sm:px-6 ${
              isDeleting ? "opacity-50" : ""
            }`}
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl font-semibold ${color.badge}`}
            >
              {getInitial(expense.category)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-gray-900">
                {expense.category}
                {expense["sub-category"] && (
                  <span className="font-normal text-gray-500"> · {expense["sub-category"]}</span>
                )}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(expense.date)} · {expense.expenseId}
              </p>
            </div>

            <span className="font-semibold tabular-nums text-gray-900">
              {formatAmount(expense.amount)}
            </span>

            <div className="flex items-center gap-1 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
              <Link
                to={`/expenses/${expense.expenseId}/edit`}
                aria-label={`Edit ${expense.expenseId}`}
                title="Edit"
                className="flex size-8 items-center justify-center rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600"
              >
                <PencilIcon className="size-4" />
              </Link>
              <button
                type="button"
                onClick={() => onDelete(expense.expenseId)}
                disabled={isDeleting}
                aria-label={`Delete ${expense.expenseId}`}
                title="Delete"
                className="flex size-8 items-center justify-center rounded-lg bg-transparent text-gray-500 cursor-pointer hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed"
              >
                <TrashIcon className="size-4" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ExpenseList;
