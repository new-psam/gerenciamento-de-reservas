import { IUserRepository } from "@/repositories/user/user.repository.interface";

export class DeleteUserUseCase {
    constructor (private userRepository: IUserRepository) {};

    async execute(id: string): Promise<void> {
        if(!id) {
            throw new Error("O Id do usuário é obrigatório para exclusão!");
        }

        await this.userRepository.delete(id);
    }
}