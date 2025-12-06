import { IRestaurant } from "@/entities/models/restaurant.interface";
import { IRestaurantRepository } from "@/repositories/restaurant/restaurant.repository.interface";

export class FindRestaurantByIdUseCase {
    constructor(private restaurantRepository: IRestaurantRepository) {}

    async execute(id: string): Promise<IRestaurant | null> {
        return this.restaurantRepository.findById(id);
    }
}