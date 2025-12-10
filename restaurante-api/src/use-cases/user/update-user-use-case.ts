import { IUser } from "@/entities/models/user.interface";
import { IUserRepository } from "@/repositories/user/user.repository.interface";

export class UpdateUserUseCase {
    constructor(private userRepository: IUserRepository){};

    async execute(user: IUser): Promise<IUser> {
        if (!user.id) {
            throw new Error("O ID do usuário é obrigatório para a atualização.");
        }
        
        if (!user.email || user.email.trim().length === 0) {
            throw new Error("O email do usuário não pode ser vazio.");
        }
        
        if (!user.password || user.password.trim().length === 0) {
            throw new Error("A senha do usuário não pode ser vazio.");
        }
        return this.userRepository.update(user);
    }
}