import { IUser } from "@/entities/models/user.interface";

export interface IUserRepository {
    findAll(page: number, limit: number): Promise<IUser[]>
    findById(id: string): Promise<IUser | null>
    create(user: IUser): Promise<IUser>
    update(user: IUser): Promise<IUser>
    delete(id: string): Promise<void>
}