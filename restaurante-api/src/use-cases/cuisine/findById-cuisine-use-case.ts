import { ICuisine } from "@/entities/models/cuisine.interface";
import { ICuisineRepository } from "@/repositories/cuisine/cuisine.repository.interface";

export class FindCuisineByIdUseCase {
    constructor(private cuisineRepository: ICuisineRepository) {}

    async handler(id: string): Promise<ICuisine | null> {
        return this.cuisineRepository.findById(id);
    }
}