import { FastifyReply, FastifyRequest } from "fastify";
import { cuisineParamsSchema } from "./cuisine-schemas";
import { makeFindCuisineByIdUseCase } from "@/use-cases/cuisine/cuisine-use-case-factory";

export async function findByIdCuisine(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = cuisineParamsSchema.parse(request.params);
    const findByIdCuisineUseCase = makeFindCuisineByIdUseCase;
    const cuisine = await findByIdCuisineUseCase.handler(id);
    return reply.status(200).send(cuisine);
}