import api from "../api/axios";

export const getExpenses = () => api.get("/expenses");

export const getExpense = (expenseId) => api.get(`/expenses/${expenseId}`);

export const createExpense = (data) => api.post("/expenses/create", data);

export const updateExpense = (expenseId, data) =>
  api.put(`/expenses/${expenseId}`, data);

export const deleteExpense = (expenseId) =>
  api.delete(`/expenses/${expenseId}`);
