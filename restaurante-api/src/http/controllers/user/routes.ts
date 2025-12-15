import { FastifyInstance } from "fastify"
import { 
    createUser, 
    deleteUser, 
    getUserById, 
    listUsers, 
    updateUser } from "./user-controller"

export async function userRoutes(app: FastifyInstance) {
    app.get('/', listUsers)
    app.post('/', createUser)
    app.get('/:id', getUserById)
    app.put('/:id', updateUser)
    app.delete('/:id', deleteUser)
    
}