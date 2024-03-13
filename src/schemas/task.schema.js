import {z} from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
            required_error: "Title is required"
    }).min(5, {message: "Title must be at least 5 characters long"}),
    description: z.string({
        required_error: "Description is required"
    }).min(5, {message: "Description must be at least 5 characters long"}),
    date: z.string().optional(),
});
