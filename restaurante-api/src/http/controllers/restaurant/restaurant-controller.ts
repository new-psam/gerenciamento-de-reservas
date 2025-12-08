import { IRestaurant } from "@/entities/models/restaurant.interface";
import { 
    createRestaurantBodySchema, 
    restaurantParamsSchema, 
    restaurantQuerySchema, 
    searchRestaurantQuerySchema} from "@/schemas/restaurant.schema";
import { 
    makeCreateRestaurantUseCase, 
    makeDeleteRestaurantUseCase, 
    makeFindAllRestaurantUseCase, 
    makeFindRestaurantByIdUseCase, 
    makeSearchRestaurantByAddressUseCase, 
    makeUpdateRestaurantUseCase } from "@/use-cases/restaurant/factory-restaurant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listRestaurants(request: FastifyRequest, reply: FastifyReply){
    const { page, limit } = restaurantQuerySchema.parse(request.query);
    try {
        const restaurants = await makeFindAllRestaurantUseCase.execute(page, limit);
        return reply.status(200).send({
            data: restaurants,
            total: restaurants.length,
            message: "Lista de restaurantes recuperados com sucesso!"
        })
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Erro interno ao listar restaurantes."});
    }
}

export async function getRestaurantById(request: FastifyRequest, reply: FastifyReply){
    const { id } = restaurantParamsSchema.parse(request.params);
    try {
        const restaurant = await makeFindRestaurantByIdUseCase.execute(id);
        if (!restaurant) {
            return reply.status(404).send({ error: "restaurante não encontrado!"});
        }
        return reply.status(200).send(restaurant);

    } catch (error) {
        request.log.error(error);
        // ZodError já é tratado pela validação de parâmetro, mas mantemos o erro 500 para outros.
        return reply.status(500).send({ error: "Erro interno ao buscar o restaurante"});
    }
}

export async function createRestaurant(request: FastifyRequest, reply: FastifyReply){
    try {
        const inputData = createRestaurantBodySchema.parse(request.body);
        const newRestaurant = await makeCreateRestaurantUseCase.execute(inputData);
        return reply.status(201).send(newRestaurant)
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ message: "Dados inválidos.", errors: error.issues });
        }
        return reply.status(400).send({ message: (error as Error).message});
    }
}

export async function updateRestaurant(request: FastifyRequest, reply: FastifyReply) {
    const { id } = restaurantParamsSchema.parse(request.params);
    /*const updateSchema = z.object({
        name: z.string().optional(),
        capacity: z.coerce.number().min(1).optional(),
        address: createRestaurantBodySchema.shape.address.optional(),
        cuisineIds: createRestaurantBodySchema.shape.cuisineIds.optional(),
    }).strict();*/
    const updateSchema = createRestaurantBodySchema.partial().extend({
        address: createRestaurantBodySchema.shape.address.partial().extend({
           id: z.string().uuid(") ID do endereço é necessario para atualização de endereço.") 
        }).optional(),
        cuisineIds: createRestaurantBodySchema.shape.cuisineIds.optional(),
    }).strict();
    try {
        const updateData = updateSchema.parse(request.body);
        const restaurantUpdateDTO: IRestaurant = { id, ...updateData } as IRestaurant;
        if (updateData.cuisineIds) {
            (restaurantUpdateDTO as any).cuisines = updateData.cuisineIds.map((cid:string)=> ({id:cid})) as any;
            delete (restaurantUpdateDTO as any).cuisineIds;
        }
        const updateRestaurant = await makeUpdateRestaurantUseCase.execute(restaurantUpdateDTO);
        return reply.status(200).send(updateRestaurant);
        
    } catch (error) {
        if (error instanceof z.ZodError) {
             return reply.status(400).send({ message: "Dados inválidos para atualização." });
        }
        return reply.status(400).send({ message: (error as Error).message });
    }
}

export async function deleteRestaurant(request: FastifyRequest, reply: FastifyReply) {
    const { id } = restaurantParamsSchema.parse(request.params);
    try {
        await makeDeleteRestaurantUseCase.execute(id);
        return reply.status(204).send();
    } catch (error) {
        return reply.status(400).send({ message: (error as Error).message });
    }
}

export async function SearchByAddress(request: FastifyRequest, reply: FastifyReply) {
    const { city, street } = searchRestaurantQuerySchema.parse(request.query);
    try {
        const restaurants = await makeSearchRestaurantByAddressUseCase.execute(city, street);
        return reply.status(200).send({
            data: restaurants,
            total: restaurants.length,
            message: "Busca realizada com sucesso."
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
             return reply.status(400).send({ message: "Parâmetros de busca inválidos.", errors: error.issues });
        }
        return reply.status(400).send({ message: (error as Error).message });
    }
}