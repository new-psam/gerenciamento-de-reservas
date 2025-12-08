import { IRestaurant } from "@/entities/models/restaurant.interface";
import { IAddressRepository } from "@/repositories/address/address.repository.interface";
import { ICuisineRepository } from "@/repositories/cuisine/cuisine.repository.interface";
import { IRestaurantRepository } from "@/repositories/restaurant/restaurant.repository.interface";

export class UpdateRestaurantUseCase {
    constructor(
        private restaurantRepository: IRestaurantRepository,
        private addressRepository: IAddressRepository,
        private cuisineRepository: ICuisineRepository,
    ) {}

    async execute(restaurant: IRestaurant): Promise<IRestaurant> {
        if (!restaurant.id) {
            throw new Error("O ID do restaurante é obrigatório para a atualização");
        }
        // [Regra de Negócio]: O nome do restaurante não pode ser vazio.
        if (!restaurant.name || restaurant.name.trim().length === 0) {
            throw new Error("O nome do restaurante não pode ser vazio.");
        }

        if (restaurant.address && typeof restaurant.address !== 'string' && restaurant.address.id) {
            await this.addressRepository.update(restaurant.address);
        }

        if (restaurant.cuisines && restaurant.cuisines.length > 0) {
            const cuisineIds = restaurant.cuisines.map(c => c.id!).filter(Boolean);
            if (cuisineIds.length > 0) {
                const updatedCuisines = await this.cuisineRepository.findByIds(cuisineIds);

                if(updatedCuisines.length !== cuisineIds.length) {
                    throw new Error("Uma ou mais IDs de cozinha para atualização são inválidos ou não existem.")
                }

                restaurant.cuisines = updatedCuisines;
            }
        }

        return this.restaurantRepository.update(restaurant);
    }
}