import z from "zod";


// create
export const createCategoryValidator = z.object({
    body: z.object({
        name: z.string().min(3, "at least 3 charters are required").trim(),
        description: z.string().min(10, "at least 10 charters are required").trim(),
    }),
    params: z.object().default({}),
    query: z.object().default({}),
});

//update
