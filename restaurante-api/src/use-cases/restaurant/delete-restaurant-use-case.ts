import { IRestaurantRepository } from "@/repositories/restaurant/restaurant.repository.interface";

export class DeleteRestaurantUseCase {
    constructor(private restaurantRepository: IRestaurantRepository){}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new Error("O Id do restaurante é obrigatório para a exclusão!!");
        }
        await this.restaurantRepository.delete(id);
    }
}