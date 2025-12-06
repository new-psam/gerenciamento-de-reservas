import { AddressRepository } from "@/repositories/address/address.repository";
import { CuisineRepository } from "@/repositories/cuisine/cuisine.repository";
import { RestaurantRepository } from "@/repositories/restaurant/restaurant.repository";
import { RestaurantSlotRepository } from "@/repositories/restaurantSlot/slot.repository";
import { CreateRestaurantUseCase } from "./create-restaurant-use-case";
import { FindAllRestaurantUseCase } from "./findAll-restaurant-use-case";
import { FindRestaurantByIdUseCase } from "./findById-restaurant-use-case";
import { UpdateRestaurantUseCase } from "./update-restaurant-use-case";
import { DeleteRestaurantUseCase } from "./delete-restaurant-use-case";


const restaurantRepository = new RestaurantRepository();
const addressRepository = new AddressRepository();
const slotRepository = new RestaurantSlotRepository();
const cuisineRepository = new CuisineRepository();
    // create
export const makeCreateRestaurantUseCase = new CreateRestaurantUseCase(
    restaurantRepository,
    addressRepository,
    cuisineRepository,
    slotRepository,
);
//restante
export const makeFindAllRestaurantUseCase = new FindAllRestaurantUseCase(restaurantRepository);
export const makeFindRestaurantByIdUseCase = new FindRestaurantByIdUseCase(restaurantRepository);
export const makeUpdateRestaurantUseCase = new UpdateRestaurantUseCase(restaurantRepository);
export const makeDeleteRestaurantUseCase = new DeleteRestaurantUseCase(restaurantRepository);
