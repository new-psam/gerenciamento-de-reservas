import { UserRepository } from "@/repositories/user/user.repository";
import { FindAllUserUseCase } from "./findAll-user-use-case";
import { FindUserByIdUseCase } from "./findUserById-use-case";
import { CreateUserUseCase } from "./create-user-use-case";
import { UpdateUserUseCase } from "./update-user-use-case";
import { DeleteUserUseCase } from "./delete-user-use-case";

const userRepository = new UserRepository();


export const makeFindAllUserUseCase = new FindAllUserUseCase(userRepository);

export const makeFindUserByIdUseCase = new FindUserByIdUseCase(userRepository);

export const makeCreateUserUseCase = new CreateUserUseCase(userRepository);

export const makeUpdateUserUseCase = new UpdateUserUseCase(userRepository);

export const makeDeleteUserUseCase = new DeleteUserUseCase(userRepository); 