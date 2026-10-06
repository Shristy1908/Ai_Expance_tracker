import express from "express";
import { createExpense, getAllExpenses, getExpenseById, updateExpense} from "../controllers/Expense.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",authMiddleware,createExpense);
router.get("/",authMiddleware,getAllExpenses);
router.get("/:expenseId",authMiddleware,getExpenseById);
router.put("/:expenseId",authMiddleware,updateExpense);

export default router;