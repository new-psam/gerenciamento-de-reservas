import { FastifyInstance } from "fastify";
import { createRestaurant, deleteRestaurant, getRestaurantById, listRestaurants, SearchByAddress, updateRestaurant } from "./restaurant-controller";

export async function restaurantRoutes(app: FastifyInstance) {
    app.get('/', listRestaurants)
    app.post('/', createRestaurant)
    app.get('/search', SearchByAddress)
    app.get('/:id', getRestaurantById)
    app.put('/:id', updateRestaurant)
    app.delete('/:id', deleteRestaurant)
    
}