import { IRestaurant } from "@/entities/models/restaurant.interface";
import { IRestaurantSlot } from "@/entities/models/restaurantSlot.interface";
import { BaseRepository } from "@/lib/base/baseRepository";
import { IRestaurantSlotRepository } from "./slot.repository.interface";
import { RestaurantSlot } from "@/entities/restaurantSlot.entity";
import { FindOptionsWhere, MoreThanOrEqual } from "typeorm";

export class RestaurantSlotRepository 
    extends BaseRepository<RestaurantSlot> 
    implements IRestaurantSlotRepository{
        constructor() {
            super(RestaurantSlot)
        }

    async createMany(slots: IRestaurantSlot[]): Promise<IRestaurantSlot[]> {
        const newSlots = this.repository.create(slots as any);
        return this.repository.save(newSlots) as any;
    }

    async findAvailableSlot(restaurantId: string, time: Date): Promise<IRestaurantSlot | null> {
        return this.repository.findOne({
            where: {
                restaurant: { id: restaurantId } as any, // filtra pelo relacionamento
                reservationTime: time,
                is_booked: false,
            } as FindOptionsWhere<RestaurantSlot>, // assegura a tipage para o where aninhado 
        }) as any
    }

    async markAsBooked(slotId: string): Promise<void> {
        await this.repository.update(slotId, {
            is_booked: true,
        });
    }

    async findAllByRestaurant(restaurantId: string): Promise<IRestaurantSlot[]> {
        return this.repository.find({
            where: {
                restaurant: { id: restaurantId } as any,
                // Filtra por slots que ainda não passaram (exemplo)
                reservationTime: MoreThanOrEqual(new Date()),
            } as FindOptionsWhere<RestaurantSlot>,
            order: {
                reservationTime: 'ASC',
            },

        }) as any
    }
    
}