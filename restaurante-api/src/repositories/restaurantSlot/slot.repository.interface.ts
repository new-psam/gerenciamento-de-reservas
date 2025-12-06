import { IRestaurantSlot } from "@/entities/models/restaurantSlot.interface"

export interface IRestaurantSlotRepository {
    

    /**
     * Cria e persiste múltiplos slots de uma só vez (usado no CreateRestaurant).
     * param slots - Array de objetos IRestaurantSlot.
     */
    createMany(slots: IRestaurantSlot[]): Promise<IRestaurantSlot[]>


    //busca um slot disponível para uma data/hora específica (usado no CreateReservation)
    findAvailableSlot(restaurantId: string, time: Date): Promise<IRestaurantSlot | null>

    //marca um slot como ocupado após uma reserva ser confirmada.
    markAsBooked(slotId: string): Promise<void>

    // lista todos os slots de um restaurante (para o frontend exibir disponibilidade).
    findAllByRestaurant(restaurantId: string): Promise<IRestaurantSlot[]>
}