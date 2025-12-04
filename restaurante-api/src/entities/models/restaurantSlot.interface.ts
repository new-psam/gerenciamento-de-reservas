import { IRestaurant } from "./restaurant.interface"

export interface IRestaurantSlot {
    id?:string
    reservationTime: Date
    is_booked: boolean
    restaurant: IRestaurant | string
}