import { IAddress } from "@/entities/models/address.interface";

// DTO de entrada para a criação de um restaurante
export interface CreateRestaurantDTO {
    name: string;
    capacity: number;
    address: Omit<IAddress, 'id' | 'restaurant' >;
    cuisineIds: string[];
}