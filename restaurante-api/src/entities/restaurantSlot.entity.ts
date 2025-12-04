import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { IRestaurantSlot } from "./models/restaurantSlot.interface";
import { Restaurant } from "./restaurant.entity";
import { Reservation } from "./reservation.entity";


@Entity({
    name: 'restaurant_slots'
})
export class RestaurantSlot implements IRestaurantSlot {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id'
    })
    id?: string | undefined;

    @Column({
        name: 'start_time',
        type: 'timestamp without time zone'
            })
    reservationTime: Date;

    @Column({
        name: 'is_booked',
        type: 'boolean',
        default: false
     })
    is_booked: boolean;

    @ManyToOne(() => Restaurant, restaurant => restaurant.slots)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant!: Restaurant;

    @OneToMany(()=> Reservation, reservation => reservation.slots)
    reservations!: Reservation[];
}