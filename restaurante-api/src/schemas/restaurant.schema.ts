import { z } from "zod";
import { cuisineParamsSchema, cuisineQuerySchema } from "./cuisine.schema";

// --- DTO de Endereço para a Requisição ---
const addressBodySchema = z.object({
    street: z.string().min(3).max(150),
    city: z.string().min(2).max(100),
    state: z.string().length(2),
    zip_code: z.string().regex(/^\d{5}-\d{3}$|^\d{8}$/, "CEP inválido. Use 12345-678 ou 12345678.").max(10),
});

// --- Schema de Criação do Restaurante (BODY) ---
export const createRestaurantBodySchema = z.object({
    name: z.string().min(3).max(255),
    capacity: z.coerce.number().min(1, "A capacidade deve ser de pelo menos 1 pessoa."),
    // valida o endereço aninhado
    address: addressBodySchema,
    cuisineIds: z.array(z.string().uuid("Os IDs de cozinha devem ser UUIDs válidos"))
            .min(1, "É obrigatório selecionar pelo menos uma cozinha!"),
});

export const searchRestaurantQuerySchema = z.object({
    city: z.string().min(3, "A cidade é obrigatória para a busca.").max(100),
    street: z.string().optional(),
});

// --- Schemas Reutilizáveis ---
export const restaurantParamsSchema = cuisineParamsSchema;
export const restaurantQuerySchema = cuisineQuerySchema;