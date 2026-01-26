import { z } from "zod";

export const nameSchema = z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be 50 characters or fewer" })
    .regex(/^[A-Za-z. ]+$/, {
        message: "Name may contain letters, spaces, and dots only",
    });

export const emailSchema = z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .toLowerCase()
    .email({ message: "Please enter a valid email address" })
    .max(50, { message: "Email must be 50 characters or fewer" });

export const passwordSchema = z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must not exceed 20 characters" });

export const loginInputValidator = (inputData: { email: string; password: string }) => {
    const schema = z.object({
        email: emailSchema,
        password: passwordSchema,
    });

    const result = schema.safeParse(inputData);

    return result;
};

export const registerInputValidator = (inputData: { name: string; email: string; password: string; confirmPassword: string }) => {
    const schema = z
        .object({
            name: nameSchema,
            email: emailSchema,
            password: passwordSchema,
            confirmPassword: z.string().trim(),
        })
        .refine(
            data => {
                return data.password === data.confirmPassword;
            },
            { message: "Passwords do not match", path: ["confirmPassword"] }
        );

    const result = schema.safeParse(inputData);

    return result;
};
