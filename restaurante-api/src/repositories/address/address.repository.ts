import { IAddress } from "@/entities/models/address.interface";
import { IAddressRepository } from "./address.repository.interface";
import { Address } from "@/entities/address.entitty";
import { BaseRepository } from "@/lib/base/baseRepository";

export class AddressRepository extends BaseRepository<Address> implements IAddressRepository {

    constructor() {
        super(Address)
    }

    async findAll(page: number, limit: number): Promise<IAddress[]> {
        return this.repository.find({
           skip: (page - 1) * limit,
           take: limit, 
        });
    }

    async findById(id: string): Promise<IAddress | null> {
        return this.repository.findOne({
            where: { id }
        });
    }

    async create(address: IAddress): Promise<IAddress> {
        return this.repository.save(address);
    }

    async update(address: IAddress): Promise<IAddress> {
        return this.repository.save(address);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
    
}