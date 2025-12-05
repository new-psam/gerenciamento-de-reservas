import { makeFindAllCuisinesUseCase } from "@/use-cases/cuisine/cuisine-use-case-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { cuisineQuerySchema } from "./cuisine-schemas";

export async function findAllCuisines(
    request: FastifyRequest,
    reply: FastifyReply
) {
   

    const { page, limit } = cuisineQuerySchema.parse(request.query);

    const findAllCuisinesUseCase = makeFindAllCuisinesUseCase;

    const cuisines = await findAllCuisinesUseCase.handler(page, limit);

    return reply.status(200).send(cuisines);
}