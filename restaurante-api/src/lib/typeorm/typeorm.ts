import { DataSource } from 'typeorm';
import { env } from '@/env'
import { Address } from '@/entities/address.entitty';
import { Cuisine } from '@/entities/cuisine.entity';
import { Reservation } from '@/entities/reservation.entity';
import { Restaurant } from '@/entities/restaurant.entity';
import { RestaurantSlot } from '@/entities/restaurantSlot.entity';
import { User } from '@/entities/user.entity';



export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [Address, Cuisine, Reservation, Restaurant, RestaurantSlot, User],
    logging: env.NODE_ENV === 'development',

    // Configuração CRÍTICA para Migrations
    
    synchronize: false, //env.NODE_ENV === 'development', // Use 'true' em dev, 'false' em produção
    migrations: [__dirname + '/../migrations/*{.ts,.js}'], //,[InitialSchema1764954848488, ForceCascadeOnSlots1765151120731]
    migrationsRun: false, // Não rodar automaticamente no startup do servidor

});

export async function connectTypeORM() {
    try {
        // 1. Garante a existência do banco de dados (previne o erro 3D000)
        //await ensureDatabaseExists();
        await appDataSource.initialize();
        console.log('Database with typeorm connected!!!');
    } catch (error) {
        console.error('[DB ERROR] Erro fatal ao conectar com TypeORM:', error);
        throw error;
    }
}

