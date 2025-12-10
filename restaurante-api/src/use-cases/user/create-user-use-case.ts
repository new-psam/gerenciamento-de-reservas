import { IUser } from "@/entities/models/user.interface";
import { IUserRepository } from "@/repositories/user/user.repository.interface";

export class CreateUserUseCase {
    constructor( private userRepository: IUserRepository) {};

    async execute(user: IUser): Promise<IUser> {
        if (!user.name || !user.email || !user.password) {
            throw new Error("Dados obrigatórios faltando!");
        }
        return await this.userRepository.create(user);
    }
}