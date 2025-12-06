import { IRestaurant } from "@/entities/models/restaurant.interface";
import { IRestaurantRepository } from "@/repositories/restaurant/restaurant.repository.interface";

export class UpdateRestaurantUseCase {
    constructor(private restaurantRepository: IRestaurantRepository) {}

    async execute(restaurant: IRestaurant): Promise<IRestaurant> {
        if (!restaurant.id) {
            throw new Error("O ID do restaurante é obrigatório para a atualização");
        }
        // [Regra de Negócio]: O nome do restaurante não pode ser vazio.
        if (!restaurant.name || restaurant.name.trim().length === 0) {
            throw new Error("O nome do restaurante não pode ser vazio.");
        }

        return this.restaurantRepository.update(restaurant);
    }
}