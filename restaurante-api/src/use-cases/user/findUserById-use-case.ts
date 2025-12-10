import { IUser } from "@/entities/models/user.interface";
import { IUserRepository } from "@/repositories/user/user.repository.interface";

export class FindUserByIdUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(id: string): Promise<IUser | null> {
        return this.userRepository.findById(id);
    }
}