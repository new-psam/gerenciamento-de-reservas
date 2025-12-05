import { Restaurant } from "@/entities/restaurant.entity";
import { BaseRepository } from "@/lib/base/baseRepository";
import { IRestaurantRepository } from "./restaurant.repository.interface";
import { IRestaurant } from "@/entities/models/restaurant.interface";

export class RestaurantRepository extends BaseRepository<Restaurant> implements IRestaurantRepository {
    constructor() {
        super(Restaurant)
    }

    async findAll(page: number, limit: number): Promise<IRestaurant[]> {
        return this.repository.find({
            relations: ['cuisines', 'address'],
            skip: (page -1) * limit,
            take: limit,
        });
    }

    async findById(id: string): Promise<IRestaurant | null> {
        return this.repository.findOne({
            relations: ['cuisines', 'address'],
            where: { id }
        });
    }

    async create(restaurant: IRestaurant): Promise<IRestaurant> {
        const newRestaurant = this.repository.create(restaurant as any);
        return this.repository.save(newRestaurant) as any;
    }
    async update(restaurant: IRestaurant): Promise<IRestaurant> {
        return this.repository.save(restaurant as any) as any;
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}