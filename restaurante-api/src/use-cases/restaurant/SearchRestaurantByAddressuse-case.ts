import { IRestaurant } from "@/entities/models/restaurant.interface";
import { IRestaurantRepository } from "@/repositories/restaurant/restaurant.repository.interface";

export class SearchRestaurantByAddressUseCase {
    constructor( private restaurantRepository: IRestaurantRepository) {}

    async execute(city: string, street?: string): Promise<IRestaurant[]> {
        if (!city || city.trim().length < 3) {
            throw new Error("O nome da cidade deve ter pelo menos 3 caracteres para a busca!");
        }

        return this.restaurantRepository.searchByAddress(city, street);
    }
}