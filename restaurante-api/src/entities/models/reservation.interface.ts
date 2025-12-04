import { IRestaurant } from "./restaurant.interface"
import { IRestaurantSlot } from "./restaurantSlot.interface"
import { IUser } from "./user.interface"

export interface IReservation {
    id?: string
    number_people: number
    created_at: Date
    restaurants: IRestaurant | string
    slots: IRestaurantSlot | string
    users: IUser | string
}