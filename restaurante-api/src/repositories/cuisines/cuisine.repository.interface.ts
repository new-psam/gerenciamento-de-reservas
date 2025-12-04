import { ICuisine } from "@/entities/models/cuisine.interface"

export interface ICuisineRepository {
    findAll(page: number, limit: number): Promise<ICuisine[]>
    findById(id: string): Promise<ICuisine | null>
    create(cuisine: ICuisine): Promise<ICuisine>
    update(cuisine: ICuisine): Promise<ICuisine>
    delete(id: string): Promise<void>
}