import { UserRole } from "@/enums/userRole";
import { 
    userBodySchema, 
    userParamsSchema, 
    userQuerySchema, 
    userUpdateBodySchema } from "@/schemas/user.schema";
import { 
    makeCreateUserUseCase, 
    makeDeleteUserUseCase, 
    makeFindAllUserUseCase, 
    makeFindUserByIdUseCase, 
    makeUpdateUserUseCase } from "@/use-cases/user/user-use-case-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import {z} from "zod";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = userQuerySchema.parse(request.query);
    try {
        const users = await makeFindAllUserUseCase.execute(page, limit);
        return reply.status(200).send({
            data: users,
            total: users.length,
            message: "Lista de usuários receuperados com sucesso!"
        })
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({error: "Erro interno ao listar usuários!"});
    }
}

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userParamsSchema.parse(request.params);
    try {
        const user = await makeFindUserByIdUseCase.execute(id);
        if (!user) {
            return reply.status(404).send({error: "usuário não encontrado!"});
        }
        return reply.status(200).send(user);
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({error: "Erro interno ao buscar usuário!"});
    }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const data = userBodySchema.parse(request.body);
        const newUser = await makeCreateUserUseCase.execute({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || UserRole.CLIENT
        });
        return reply.status(201).send(newUser);
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ message: "Dados inválidos.", errors: error.issues });
        }
        return reply.status(400).send({ message: (error as Error).message});
    }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userParamsSchema.parse(request.params);
    const data = userUpdateBodySchema.parse(request.body);
    try {
        const existingUser = await makeFindUserByIdUseCase.execute(id);
        if (!existingUser) {
            return reply.status(404).send({error: "Usuário não encontrado!"});
        }
        const updateUser = await makeUpdateUserUseCase.execute({
            id,
            name: data.name ?? existingUser.name,
            email: data.email ?? existingUser.email,
            password: data.password ?? existingUser.password,
            role: data.role ?? existingUser.role
        });
        return reply.status(200).send(updateUser);
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ message: "Dados inválidos.", errors: error.issues });
        }
        return reply.status(400).send({ message: (error as Error).message});
    }
}

export async  function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userParamsSchema.parse(request.params);
    try {
        const deleteUser = await makeDeleteUserUseCase.execute(id);
        return reply.status(204).send();
    } catch (error) {
        if(error instanceof z.ZodError) {
            return reply.status(400).send({ message: "Dados inválidos.", errors: error.issues });
        }
        return reply.status(400).send({ message: (error as Error).message});
    }
    
}