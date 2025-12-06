import { IAddressRepository } from "@/repositories/address/address.repository.interface";
import { IRestaurantRepository } from "@/repositories/restaurant/restaurant.repository.interface";
import { IRestaurantSlotRepository } from "@/repositories/restaurantSlot/slot.repository.interface";
import { CreateRestaurantDTO } from "./create-restaurant-dto";
import { IRestaurant } from "@/entities/models/restaurant.interface";
import { ICuisineRepository } from "@/repositories/cuisine/cuisine.repository.interface";
import { IRestaurantSlot } from "@/entities/models/restaurantSlot.interface";

export class CreateRestaurantUseCase {
    // Definimos o limite de horário padrão para 18h a 22h
    private readonly defaultHours = [18, 19, 20, 21, 22]; 
    private readonly oneDayInMs = 24 * 60 * 60 * 1000;

    constructor(
        private restaurantRepository: IRestaurantRepository,
        private addressRepository: IAddressRepository,
        private cuisineRepository: ICuisineRepository,
        private slotRepository: IRestaurantSlotRepository
    ) {}

    async execute(input: CreateRestaurantDTO): Promise<IRestaurant> {
        if (!input.address.city || !input.name || input.capacity <= 0 || input.cuisineIds.length === 0) {
            throw new Error("Dados obrigatórios faltando (nome, capacidade válida, cidade ou cozinha).");
        }
        // endereço
        const newAddress = await this.addressRepository.create(input.address);
        // busca cozinhas
        const cuisines = await this.cuisineRepository.findByIds(input.cuisineIds);
        if (cuisines.length !== input.cuisineIds.length) {
            throw new Error("Uma ou mais IDs de cozinha fornecidas são inválidos ou não existem.");
        }
        // preparação dados
        const restaurantData: IRestaurant = {
            name: input.name,
            capacity: input.capacity,
            review_count: 0,
            average_rating: 0,
            // víncula as entidades
            address: newAddress,
            cuisines: cuisines,
        };
        // criação do restaurante
        const newRestaurant = await this.restaurantRepository.create(restaurantData);
        //criação dos slots iniciais
        const tomorrowBase = new Date(Date.now() + this.oneDayInMs);
        tomorrowBase.setHours(0, 0, 0, 0);
        const slotsToCreate: IRestaurantSlot[] = this.defaultHours.map(hour => {
            const slotTime = new Date(tomorrowBase.getTime());
            slotTime.setHours(hour, 0, 0, 0);

            return {
                reservationTime: slotTime,
                is_booked: false,
                restaurant: newRestaurant,
            } as IRestaurantSlot;
        });
        await this.slotRepository.createMany(slotsToCreate);
        // Retorno (Retorna o restaurante completo)
        return newRestaurant;
    }
}