import { ICuisine } from "@/entities/models/cuisine.interface";
import { ICuisineRepository } from "./cuisine.repository.interface";
import { Cuisine } from "@/entities/cuisine.entity";
import { BaseRepository } from "@/lib/base/baseRepository";

export class CuisineRepository extends BaseRepository<Cuisine> implements ICuisineRepository {
    
    constructor() {
        super(Cuisine)
    }

    async findAll(page: number, limit: number): Promise<ICuisine[]> {
        return this.repository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findById(id: string): Promise<ICuisine | null> {
        return this.repository.findOne({
            where: { id }
        });
    }

    async create(cuisine: ICuisine): Promise<ICuisine> {
        const newCuisine = this.repository.create(cuisine as any);
        return this.repository.save(newCuisine) as any
    }

    async update(cuisine: ICuisine): Promise<ICuisine> {
        return this.repository.save(cuisine as any) as any;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
    
}