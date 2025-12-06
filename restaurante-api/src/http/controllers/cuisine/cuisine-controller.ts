import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
// Importação dos Schemas de Validação
import { 
    cuisineBodySchema, 
    cuisineParamsSchema, 
    cuisineQuerySchema } from "../../../schemas/cuisine.schema";
import { 
    makeCreateCuisineUseCase, 
    makeDeleteCuisineUseCase, 
    makeFindAllCuisinesUseCase, 
    makeFindCuisineByIdUseCase, 
    makeUpdateCuisineUseCase } from "@/use-cases/cuisine/cuisine-use-case-factory";
import { error } from "console";
// Importa todas as instâncias dos Use Cases do Factory Centralizado


// --- Handlers CRUD ---

/**
 * [GET] /api/restaurants/cuisines
 * Lista todas as cozinhas com paginação.
 */

export async function listCuisines(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { page, limit } = cuisineQuerySchema.parse(request.query);
    try {
        const cuisines = await makeFindAllCuisinesUseCase.handler(page, limit);
        return reply.status(200).send({
            data: cuisines,
            total: cuisines.length,
            message: "Lista de cozinhas recuperadas com sucesso!"
        })
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Erro interno ao listar cozinhas."});
    }
}

/**
 * [GET] /api/restaurants/cuisines/:id
 * Busca uma cozinha específica por ID.
 */

export async function getCuisineById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = await cuisineParamsSchema.parse(request.params);

    try {
        const cuisine = await makeFindCuisineByIdUseCase.handler(id);
        if (!cuisine) {
            return reply.status(404).send({ error: "cozinha não encontrada!"});
        }
        return reply.status(200).send(cuisine);
    } catch (error) {
        request.log.error(error);
        // ZodError já é tratado pela validação de parâmetro, mas mantemos o erro 500 para outros.
        return reply.status(500).send({ error: "Erro interno ao buscar a."});
    }
}

/**
 * [POST] /api/restaurants/cuisines
 * Cria uma nova cozinha.
 */

export async function createCuisine(request: FastifyRequest, reply: FastifyReply) {
    try {
        const  cuisineData = cuisineBodySchema.parse(request.body);
        const newCuisine = await makeCreateCuisineUseCase.execute(cuisineData)
        return reply.status(201).send(newCuisine);
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ error: error.issues[0].message });
        }
        return reply.status(400).send({ error: (error as Error).message});
    }
}

/**
 * [PUT] /api/restaurants/cuisines/:id
 * Atualiza uma cozinha existente.
 */

export async function updateCuisine(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = cuisineParamsSchema.parse(request.params);
        const updateData = cuisineBodySchema.parse(request.body);
        const updateCuisine = await makeUpdateCuisineUseCase.execute({id, ...updateData});
        return reply.status(200).send(updateCuisine);
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ error: error.issues[0].message });
        }
        return reply.status(400).send({ error: (error as Error).message});
    }
}

/**
 * [DELETE] /api/restaurants/cuisines/:id
 * Deleta uma cozinha.
 */

export async function deleteCuisine(request: FastifyRequest, reply: FastifyReply) {
    const { id } = cuisineParamsSchema.parse(request.params);
    try {
        await makeDeleteCuisineUseCase.execute(id);
        return reply.status(204).send(); 
    } catch (error) {
        return reply.status(400).send({ error: (error as Error).message});
    }
}