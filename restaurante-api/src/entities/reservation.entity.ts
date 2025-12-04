import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IReservation } from "./models/reservation.interface";
import { Restaurant } from "./restaurant.entity";
import { User } from "./user.entity";
import { RestaurantSlot } from "./restaurantSlot.entity";

@Entity({
    name: "reservations"
})
export class Reservation implements IReservation {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id?: string | undefined;

    @Column({
                name: 'party_size',
                type: 'int',
                default: 1,
            })
    number_people: number;

    @Column({
            name: 'created_at',
            type: 'timestamp',
            default: () => "CURRENT_TIMESTAMP"
        })
    created_at: Date;

    // --- RELACIONAMENTOS MANY-TO-ONE (Chaves Estrangeiras) ---

    @ManyToOne(() => Restaurant, restaurant => restaurant.reservations)
    @JoinColumn({ name: 'restaurant_id' })
    restaurants!: Restaurant;
    
    @ManyToOne(() => User, user => user.reservations)
    @JoinColumn({ name: 'user_id' })
    users!: User;
    
    @ManyToOne(() => RestaurantSlot, slot => slot.reservations)
    @JoinColumn({ name: 'slot_id'})
    slots!: RestaurantSlot;
    
}