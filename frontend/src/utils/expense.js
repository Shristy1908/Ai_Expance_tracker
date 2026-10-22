import { toDateInputValue } from "./format.js";

export const EMPTY_EXPENSE_FORM = { amount: "", category: "", "sub-category": "", date: "" };

// API expense -> form values (all strings, as inputs expect).
export const toExpenseFormValues = (expense) => ({
  amount: String(expense.amount),
  category: expense.category,
  "sub-category": expense["sub-category"] || "",
  date: toDateInputValue(expense.date),
});

// Form values -> request body. Inputs always give strings, so amount is converted
// to a number, and an empty date is left out so the backend default (today) applies.
export const toExpensePayload = (values) => {
  const payload = {
    amount: Number(values.amount),
    category: values.category,
    "sub-category": values["sub-category"],
  };
  if (values.date) payload.date = values.date;
  return payload;
};

export const sumAmounts = (expenses) => expenses.reduce((sum, e) => sum + e.amount, 0);

// Dates are stored as UTC midnight, so compare using the UTC year and month.
export const isInMonth = (date, month = new Date()) => {
  const d = new Date(date);
  return d.getUTCFullYear() === month.getFullYear() && d.getUTCMonth() === month.getMonth();
};

// [{ category, amount }] sorted from highest to lowest spend.
export const totalsByCategory = (expenses) => {
  const totals = new Map();
  for (const { category, amount } of expenses) {
    totals.set(category, (totals.get(category) || 0) + amount);
  }
  return [...totals]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export const getExpenseStats = (expenses, month = new Date()) => {
  const byCategory = totalsByCategory(expenses);
  return {
    count: expenses.length,
    total: sumAmounts(expenses),
    monthTotal: sumAmounts(expenses.filter((e) => isInMonth(e.date, month))),
    byCategory,
    topCategory: byCategory[0] ?? null,
  };
};

export const removeExpense = (expenses, expenseId) =>
  expenses.filter((e) => e.expenseId !== expenseId);
