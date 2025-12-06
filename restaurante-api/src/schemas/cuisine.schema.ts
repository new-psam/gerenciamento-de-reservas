import { z } from 'zod';

export const cuisineBodySchema = z.object({
    name: z.string().min(1, "O nome da cozinha não pode ser vazio").max(150),
});

export const cuisineParamsSchema = z.object({
    id: z.string().uuid("O ID deve ser um formato UUID válido!")
});

export const cuisineQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
});