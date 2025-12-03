import { IAddress } from "./address.interface"
import { ICuisine } from "./cuisine.interface"

export interface IRestaurant {
    id?: string
    name: string
    capacity: number
    address: IAddress | string
    // Desnormalização (Cache do Mongo)
    review_count: number
    average_rating: number
    // Relação Many-to-Many
    cuisines?: ICuisine[]
}