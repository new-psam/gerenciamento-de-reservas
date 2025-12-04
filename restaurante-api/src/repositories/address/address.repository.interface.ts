import { IAddress } from "@/entities/models/address.interface";

export interface IAddressRepository {
    findAll(page: number, limit: number): Promise<IAddress[]>
    findById(id: string): Promise<IAddress | null>
    create(address: IAddress): Promise<IAddress>
    update(address: IAddress): Promise<IAddress>
    delete(id: string): Promise<void>
}