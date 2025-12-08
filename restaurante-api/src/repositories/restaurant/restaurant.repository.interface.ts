import { IRestaurant } from "@/entities/models/restaurant.interface"

export interface IRestaurantRepository {
    findAll(page: number, limit: number): Promise<IRestaurant[]>
    findById(id: string): Promise<IRestaurant | null>
    create(restaurant: IRestaurant): Promise<IRestaurant>
    update(restaurant: IRestaurant): Promise<IRestaurant>
    delete(id: string): Promise<void>
    // Busca restaurantes filtrando por cidade e opcionalmente por rua.
    searchByAddress(city: string, street?: string): Promise<IRestaurant[]>
}