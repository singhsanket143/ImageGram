import { z } from 'zod';

export const zodSigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
});