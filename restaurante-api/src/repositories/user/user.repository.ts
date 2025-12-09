import { BaseRepository } from "@/lib/base/baseRepository";
import { IUserRepository } from "./user.repository.interface";
import { User } from "@/entities/user.entity";
import { IUser } from "@/entities/models/user.interface";

export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor() {
        super(User)
    }
    async findAll(page: number, limit: number): Promise<IUser[]> {
        return this.repository.find({
            relations: ['reservations'],
            skip: (page -1) * limit,
            take: limit,
        });
    }
    async findById(id: string): Promise<IUser | null> {
        return this.repository.findOne({
            relations: ['reservations'],
            where: { id }
        });
    }
    async create(user: IUser): Promise<IUser> {
        const newUser = this.repository.create(user as any);
        return this.repository.save(newUser) as any;
    }
    async update(user: IUser): Promise<IUser> {
        return this.repository.save(user as any) as any;
    }
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}