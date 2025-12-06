import 'reflect-metadata';
import { app, setupApp } from "./app";
import { env } from './env';
import { connectTypeORM } from './lib/typeorm/typeorm';


async function start() {
    try {
        // PASSO 1: CONEXÃO COM A INFRAESTRUTURA
        console.log("[INFRA] Conectando ao banco de dados do PostgreSQL...");

        await connectTypeORM();
        
/*
        // PASSO 2: POPULAÇÃO DE DADOS (Apenas em desenvolvimento)
        if (env.NODE_ENV === 'development') {
            await seedDatabase();
            console.log("[INFRA] Dados de teste semeados com sucesso.");
        }
*/
        // PASSO 3: CONFIGURAÇÃO DO APP (CORS, JWT, Rotas)
        await setupApp(); 
        
        // PASSO 4: INICIAR O SERVIDOR
        await app.listen({ 
            host: '0.0.0.0', 
            port: env.PORT 
        });

        console.log(`[SERVER] 🚀 Server is running on http://localhost:${env.PORT}`);

    } catch(err) {
        console.error("[ERROR] Falha grave ao iniciar o servidor:", err);
        process.exit(1); 
    }
}

start();
/*
app.listen({
    host: '0.0.0.0',
    port: env.PORT
})
    .then(() => {
        console.log(`Server is running on http://localhost:${env.PORT}`);
    })
        */