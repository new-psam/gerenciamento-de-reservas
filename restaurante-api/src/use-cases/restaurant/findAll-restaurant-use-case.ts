import { IRestaurant } from "@/entities/models/restaurant.interface";
import { IRestaurantRepository } from "@/repositories/restaurant/restaurant.repository.interface";

export class FindAllRestaurantUseCase {
    constructor(private restaurantRepository: IRestaurantRepository) {}

    async execute(page: number, limit: number): Promise<IRestaurant[]> {
        return this.restaurantRepository.findAll(page, limit)
    }
}