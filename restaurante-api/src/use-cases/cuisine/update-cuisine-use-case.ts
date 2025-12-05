import { ICuisine } from "@/entities/models/cuisine.interface";
import { ICuisineRepository } from "@/repositories/cuisine/cuisine.repository.interface";

export class UpdateCuisineUseCase {
    constructor(private cuisineRepository: ICuisineRepository) {}

    async execute(cuisine: ICuisine): Promise<ICuisine> {
        if (!cuisine.id) {
            throw new Error("O ID da cozinha é obrigatório para a atualização.");
        }

        // [Regra de Negócio]: O nome da cozinha não pode ser vazio.
        if (!cuisine.name || cuisine.name.trim().length === 0) {
            throw new Error("O nome da cozinha não pode ser vazio.");
        }
        return this.cuisineRepository.update(cuisine);
    }
}