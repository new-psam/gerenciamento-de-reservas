import Fastify, { FastifyPluginOptions } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fp from 'fastify-plugin';
import { cuisineRoutes } from './http/controllers/cuisine/routes';
import { env } from "./env/index";
import { restaurantRoutes } from "./http/controllers/restaurant/routes";
import { userRoutes } from "./http/controllers/user/routes";

// 1. Instância do Fastify exportada. Não contém configuração neste ponto.
export const app = Fastify({logger: true});

/**
 * Função de configuração assíncrona.
 * É chamada pelo server.ts APÓS a conexão com o banco de dados (connectTypeORM).
 * Contém o registro de todos os plugins e rotas.
 */
export async function setupApp() {
    // 2. CORS (Permite acesso do Frontend)
    // O await é necessário para plugins assíncronos.
    await app.register(cors, {
        origin: true,
    });

     // 3. JWT (Autenticação)
    await app.register(fp(async (fastify, opts: FastifyPluginOptions) => {
        fastify.register(jwt, {
            secret: env.JWT_SECRET // Usa o segredo validado pelo Zod
        });
    }));

    app.register(cuisineRoutes, { prefix: "/api/cuisines"});
    app.register(restaurantRoutes, { prefix: "/api/restaurants"});
    app.register(userRoutes, {prefix: "/api/users"});
}



