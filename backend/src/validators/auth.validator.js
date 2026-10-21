import {z} from "zod";

export const registerSchema = z.object({
    name: z.string({error: "Name is required"}).trim().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
    email: z.string({error: "Email is required"}).email("Invalid email address").toLowerCase(),
    password: z.string({error: "Password is required"}).min(6, "Password must be at least 6 characters").regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9]/,"Password must contain at least one number").regex(/[^A-Za-z0-9]/,"Password must contain at least one special character"),
})

export const loginSchema = z.object({
    email: z.string({error: "Email is required"}).email("Invalid email address").toLowerCase(),
    password: z.string({error: "Password is required"}).min(6, "Password must be at least 6 characters"),
})