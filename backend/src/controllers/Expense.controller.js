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

export const createExpense = async (req, res) =>{
    try{
        const expenseId = await generateExpenseId();
        const expense = await Expense.create({ ...req.body, expenseId });
        res.status(201).json({
            message: "Expense created successfully",
            data: expense
        });     
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllExpenses = async (req, res) => {
    try{
        const expenses = await Expense.find();
        res.status(200).json({
            success: true,
            message: "Expenses retrieved successfully",
            data: expenses
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getExpenseById = async (req, res) => {
    try{
        const expenses = await Expense.findOne({ expenseId: req.params.expenseId });
        if(!expenses){
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
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateExpense = async (req, res) => {
    try{
        const expenses = await Expense.findOneAndUpdate(
            { expenseId: req.params.expenseId },
            req.body,
            { new: true }
        );
        if(!expenses){
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
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}