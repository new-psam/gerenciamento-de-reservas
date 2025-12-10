import { IUser } from "@/entities/models/user.interface";
import { IUserRepository } from "@/repositories/user/user.repository.interface";

export class FindAllUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(page: number, limit: number): Promise<IUser[]> {
        return this.userRepository.findAll(page, limit)
    }
}