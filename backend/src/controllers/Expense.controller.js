import Expense from "../models/expense.js";
import Counter from "../models/Counter.js";

const generateExpenseId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "expenseId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return `EXP${String(counter.seq).padStart(3, "0")}`;
};

export const createExpense = async (req, res) => {
    try {
        const expenseId = await generateExpenseId();
        const expense = await Expense.create({ ...req.body, expenseId, userId: req.userId });
        res.status(201).json({
            message: "Expense created successfully",
            data: expense
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.userId, isDeleted: { $ne: true } });
        res.status(200).json({
            success: true,
            message: "Expenses retrieved successfully",
            data: expenses
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getExpenseById = async (req, res) => {
    try {
        const expenses = await Expense.findOne({ expenseId: req.params.expenseId, userId: req.userId, isDeleted: { $ne: true } });
        if (!expenses) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Expense retrieved successfully",
            data: expenses
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateExpense = async (req, res) => {
    try {
        const { amount, category, "sub-category": subCategory, date } = req.body;
        const expenses = await Expense.findOneAndUpdate(
            { expenseId: req.params.expenseId, userId: req.userId, isDeleted: { $ne: true } },
            { amount, category, "sub-category": subCategory, date },
            { new: true, runValidators: true }
        );
        if (!expenses) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expenses
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteExpences = async (req, res) => {
    try {
        const expenses = await Expense.findOneAndUpdate({ expenseId: req.params.expenseId, userId: req.userId, isDeleted: { $ne: true } }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        if (!expenses) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: expenses
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}