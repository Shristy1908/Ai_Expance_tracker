import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import CategoryBreakdown from "../components/CategoryBreakdown.jsx";
import ExpenseList, { ExpenseListSkeleton } from "../components/ExpenseList.jsx";
import { CalendarIcon, PlusIcon, ReceiptIcon, TagIcon } from "../components/Icons.jsx";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { deleteExpense, getExpenses } from "../services/expenseService";
import { getErrorMessage, isNotFound } from "../utils/apiError.js";
import { getExpenseStats, removeExpense } from "../utils/expense.js";
import { formatAmount, formatMonthName } from "../utils/format.js";

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [now] = useState(() => new Date());

  useEffect(() => {
    // StrictMode runs effects twice in development; ignore the stale response.
    let ignore = false;
    getExpenses()
      .then((res) => {
        if (!ignore) setExpenses(res.data.data);
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err, "Could not load expenses"));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Only recalculated when the list changes, not on every render (e.g. while deleting).
  const stats = useMemo(() => getExpenseStats(expenses, now), [expenses, now]);

  const handleDelete = async (expenseId) => {
    if (!window.confirm("Delete this expense?")) return;
    setError("");
    setDeletingId(expenseId);
    try {
      await deleteExpense(expenseId);
      setExpenses((prev) => removeExpense(prev, expenseId));
    } catch (err) {
      // 404 means it was already deleted (e.g. in another tab), so drop it too.
      if (isNotFound(err)) setExpenses((prev) => removeExpense(prev, expenseId));
      else setError(getErrorMessage(err, "Could not delete expense"));
    } finally {
      setDeletingId(null);
    }
  };

  const show = (value) => (loading ? "—" : value);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
      {/* Hero */}
      <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 p-6 text-white shadow-xl shadow-blue-600/20 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 right-24 size-40 rounded-full bg-white/10" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-white/80">Welcome back, {user?.name}</p>
            <p className="mt-1 text-sm font-medium text-white/80">Total spent</p>
            <p className="text-4xl font-bold tabular-nums sm:text-5xl">
              {show(formatAmount(stats.total))}
            </p>
          </div>
          <Link
            to="/expenses/new"
            className="flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-blue-700 no-underline shadow-md hover:bg-blue-50"
          >
            <PlusIcon className="size-4" />
            Add expense
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<CalendarIcon className="size-4" />}
          label="This month"
          value={show(formatAmount(stats.monthTotal))}
          hint={`Spent in ${formatMonthName(now)}`}
        />
        <StatCard
          icon={<ReceiptIcon className="size-4" />}
          label="Expenses"
          value={show(stats.count)}
          hint="Total recorded"
        />
        <StatCard
          icon={<TagIcon className="size-4" />}
          label="Top category"
          value={show(stats.topCategory?.category || "None yet")}
          hint={
            stats.topCategory
              ? `${formatAmount(stats.topCategory.amount)} spent`
              : "Add an expense to see"
          }
        />
      </section>

      <Alert className="mb-4">{error}</Alert>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Expense list */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
            <h2 className="font-semibold text-gray-900">Recent expenses</h2>
            {!loading && stats.count > 0 && (
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {stats.count}
              </span>
            )}
          </div>

          {loading ? (
            <ExpenseListSkeleton />
          ) : stats.count === 0 ? (
            !error && (
              <div className="px-6 py-14 text-center">
                <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <ReceiptIcon className="size-7" />
                </span>
                <p className="font-semibold text-gray-900">No expenses yet</p>
                <p className="mb-5 text-sm text-gray-500">Start tracking where your money goes.</p>
                <Link
                  to="/expenses/new"
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white no-underline hover:bg-blue-700"
                >
                  <PlusIcon className="size-4" />
                  Add your first expense
                </Link>
              </div>
            )
          ) : (
            <ExpenseList expenses={expenses} onDelete={handleDelete} deletingId={deletingId} />
          )}
        </section>

        <CategoryBreakdown byCategory={stats.byCategory} total={stats.total} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
