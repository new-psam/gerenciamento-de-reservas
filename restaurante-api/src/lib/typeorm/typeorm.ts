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
});

appDataSource.initialize()
.then(() => {
    console.log('Database with typeorm connected!!!');
})
.catch((error) => {
    console.error('Error connecting to database with typeorm', error);
})