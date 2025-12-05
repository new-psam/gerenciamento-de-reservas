import { CuisineRepository } from "@/repositories/cuisine/cuisine.repository";
import { FindAllCuisineUseCase } from "./findAll-cuisine-use-case";
import { FindCuisineByIdUseCase } from "./findById-cuisine-use-case";
import { CreateCuisineUseCase } from "./create-cuisine-use-case";
import { UpdateCuisineUseCase } from "./update-cuisine-use-case";
import { DeleteCuisineUseCase } from "./delete-cuisine-use-case";

/**
 * 1. CENTRALIZAÇÃO: Instancia o repositório UMA VEZ.
 * Este é o ponto onde o TypeORM (infraestrutura) é criado.
 */
const cuisineRepository = new CuisineRepository();


/**
 * 2. EXPORTAÇÃO: Exporta todos os Use Cases já instanciados e com as dependências injetadas.
 * Isto substitui os 5 arquivos make-*-use-case.ts.
 */
export const makeFindAllCuisinesUseCase = new FindAllCuisineUseCase(cuisineRepository);

export const makeFindCuisineByIdUseCase = new FindCuisineByIdUseCase(cuisineRepository);

export const makeCreateCuisineUseCase = new CreateCuisineUseCase(cuisineRepository);

export const makeUpdateCuisineUseCase = new UpdateCuisineUseCase(cuisineRepository);

export const makeDeleteCuisineUseCase = new DeleteCuisineUseCase(cuisineRepository);