import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseFormLayout from "../components/ExpenseFormLayout.jsx";
import { PencilIcon } from "../components/Icons.jsx";
import { getExpense, updateExpense } from "../services/expenseService";
import { getErrorMessage, isNotFound } from "../utils/apiError.js";
import { toExpenseFormValues } from "../utils/expense.js";

const EditExpense = () => {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    getExpense(expenseId)
      .then((res) => {
        if (!ignore) setInitialValues(toExpenseFormValues(res.data.data));
      })
      .catch((err) => {
        if (ignore) return;
        setError(isNotFound(err) ? "Expense not found" : getErrorMessage(err, "Could not load expense"));
      });
    return () => {
      ignore = true;
    };
  }, [expenseId]);

  const handleSubmit = async (data) => {
    await updateExpense(expenseId, data);
    navigate("/dashboard");
  };

  return (
    <ExpenseFormLayout icon={<PencilIcon className="size-5" />} title="Edit expense" subtitle={expenseId}>
      {error ? (
        <div className="py-6 text-center">
          <p className="mb-4 text-sm text-red-600">{error}</p>
          <Link to="/dashboard" className="text-sm font-semibold">
            Back to dashboard
          </Link>
        </div>
      ) : !initialValues ? (
        <div className="animate-pulse space-y-5" aria-label="Loading expense">
          <div className="h-14 rounded-xl bg-gray-100" />
          <div className="h-8 w-2/3 rounded-full bg-gray-100" />
          <div className="h-11 rounded-xl bg-gray-100" />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="h-11 rounded-xl bg-gray-100" />
            <div className="h-11 rounded-xl bg-gray-100" />
          </div>
        </div>
      ) : (
        <ExpenseForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save changes" />
      )}
    </ExpenseFormLayout>
  );
};

export default EditExpense;
