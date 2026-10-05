import express from "express";
import { createExpense, getAllExpenses, getExpenseById } from "../controllers/Expense.controller.js";

const router = express.Router();

router.post("/create",createExpense);
router.get("/",getAllExpenses);
router.get("/:expenseId",getExpenseById);

export default router;