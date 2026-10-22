import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseFormLayout from "../components/ExpenseFormLayout.jsx";
import { PlusIcon } from "../components/Icons.jsx";
import { createExpense } from "../services/expenseService";
import { EMPTY_EXPENSE_FORM } from "../utils/expense.js";

const NewExpense = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createExpense(data);
    navigate("/dashboard");
  };

  return (
    <ExpenseFormLayout
      icon={<PlusIcon className="size-5" />}
      title="Add expense"
      subtitle="Record something you spent money on."
    >
      <ExpenseForm
        initialValues={EMPTY_EXPENSE_FORM}
        onSubmit={handleSubmit}
        submitLabel="Add expense"
      />
    </ExpenseFormLayout>
  );
};

export default NewExpense;
