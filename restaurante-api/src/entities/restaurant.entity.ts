import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IAddress } from "./models/address.interface";
import { ICuisine } from "./models/cuisine.interface";
import { IRestaurant } from "./models/restaurant.interface";
import { Cuisine } from "./cuisine.entity";
import { Address } from "./address.entitty";
@Entity({
    name: 'restaurant',
})
export class Restaurant implements IRestaurant {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id'
    })
    id?: string | undefined;

    @Column({
            name: 'name',
            type: 'varchar',
            length: 100,
        })
    name: string;

    @Column({
        name: 'capacity',
        type: 'int',
     })
    capacity!: number;


    // --- Desnormalização para Performance (Cache das avaliações do Mongo) ---
    @Column({
        name: 'review_count',
        type: 'int',
        default: 0
     })
    review_count!: number;

    @Column({
        name: 'average_rating',
        type: 'numeric', 
        precision: 3,
        scale: 2,
        default: 0
     })
    average_rating!: number;

    // ------- Realcionamentos

    @OneToOne(() => Address)
    @JoinColumn({ name: 'address_id'}) // Cria a coluna 'address_id na tabela 'restaurant'
    address: Address;

    @ManyToMany(() => Cuisine, cuisine => cuisine.restaurants)
    cuisines?: Cuisine[]

    @OneToOne(() => RestaurantSlot, slot => slot.restaurant)
    slots!: RestaurantSlot[];

    @OneToMany(() => Reservation, reservation => reservation.restarant)
    reservations!: Reservation[];
    
}