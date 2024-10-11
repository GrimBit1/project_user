import z from 'zod';

export const userSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email"),
    password: z.string({
        required_error: "Password is required"
    }).min(6, "Password must be at least 6 characters"),
    name: z.string({
        required_error: "Name is required"
    }).min(3, "Name is required"),
    role: z.enum(['user', 'admin']).default('user')
});

export const userLoginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email"),
    password: z.string({
        required_error: "Password is required"
    }).min(6, "Password must be at least 6 characters"),
});