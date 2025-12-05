import { ICuisineRepository } from "@/repositories/cuisine/cuisine.repository.interface";

export class DeleteCuisineUseCase{
    constructor(private cuisineRepository: ICuisineRepository) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new Error("O Id da cozinha é obrigatório para exclusão!");
        }
        // Regra de Negócio: Opcional, mas importante: 
        // Aqui deveria haver uma checagem se algum restaurante ainda usa esta cozinha.
        // Se sim, a exclusão seria impedida para manter a integridade referencial.
        // Exemplo: const usage = await this.restaurantRepository.countByCuisine(id);
        // if (usage > 0) throw new Error("Não é possível excluir: Cozinha em uso.");
        await this.cuisineRepository.delete(id);
    }
}