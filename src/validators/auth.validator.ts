import z from "zod";

// login
export const loginValidatorSchema = z.object({
    // body
    body: z.object({
        email: z.email("invalid email"),
        password: z.string("password is required")
    }),
    // params

    // query
});