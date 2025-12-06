import { FastifyInstance } from "fastify";
import { createCuisine, deleteCuisine, getCuisineById, listCuisines, updateCuisine } from "./cuisine-controller";

export async function cuisineRoutes(app: FastifyInstance) {
    app.get('/', listCuisines)
    app.get('/:id', getCuisineById)
    app.post('/', createCuisine)
    app.put('/:id', updateCuisine)
    app.delete('/:id', deleteCuisine)
}