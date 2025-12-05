import { ICuisine } from "@/entities/models/cuisine.interface";
import { ICuisineRepository } from "@/repositories/cuisine/cuisine.repository.interface";

export class FindAllCuisineUseCase {
    constructor(private cuisineRepository: ICuisineRepository) {}

    async handler(page: number, limit: number): Promise<ICuisine[]> {
        return this.cuisineRepository.findAll(page, limit)
    }
}