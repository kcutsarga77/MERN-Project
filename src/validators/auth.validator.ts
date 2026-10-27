import z from "zod";

// login
export const loginValidatorSchema = z.object({
    // body
    body: z.object({
        email: z.email("invalid email"),
        password: z
            .string("password is required")
            .regex(/[A-Z]/,"password must have at least 1 uppercase")
            .regex(/[a-z]/,"password must have at least 1 lowercase")
    }),
    // params

    // query
});