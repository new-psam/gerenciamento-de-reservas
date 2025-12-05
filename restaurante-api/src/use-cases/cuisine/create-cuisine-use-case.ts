import { ICuisine } from "@/entities/models/cuisine.interface";
import { ICuisineRepository } from "@/repositories/cuisine/cuisine.repository.interface";

export class CreateCuisineUseCase {
    constructor(private cuisineRepository: ICuisineRepository) {}

    async execute(cuisine: ICuisine): Promise<ICuisine> {
        if (!cuisine.name || cuisine.name.trim().length === 0){
            throw new Error("O nome da cozinha não pode ser vazio.");
        }
        return this.cuisineRepository.create(cuisine);
    }
}