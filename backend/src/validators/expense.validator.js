import { z } from "zod";

const expenseField = z.object({
    amount: z.number({ error: "Amount is required" }).positive("Amount must be a positive number"),
    category: z.string({ error: "Category is required" }).trim().min(1, "Category is required").max(50, "Category must be at most 50 characters"),
    "sub-category": z.string().trim().max(50, "Sub-category must be at most 50 characters").optional(),
    date: z.coerce.date({ error: "Invalid date" })
        .refine((d) => d <= new Date(), "Date cannot be in the future")
        .optional(),
})

export const createExpenseSchema = expenseField;

export const updateExpenseSchema = expenseField.partial().refine((data) => Object.keys(data).length > 0, "At least one field must be provided for update")  ;