import express from "express";
import { createExpense, getAllExpenses, getExpenseById, updateExpense,deleteExpences} from "../controllers/Expense.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createExpenseSchema, updateExpenseSchema } from "../validators/expense.validator.js";

const router = express.Router();

router.post("/create",authMiddleware,validate(createExpenseSchema),createExpense);
router.get("/",authMiddleware,getAllExpenses);
router.get("/:expenseId",authMiddleware,getExpenseById);
router.put("/:expenseId",authMiddleware,validate(updateExpenseSchema),updateExpense);
router.delete("/:expenseId",authMiddleware,deleteExpences);

export default router;