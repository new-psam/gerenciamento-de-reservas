import { UserRole } from "@/enums/userRole";
import { z } from "zod";

export  const userBodySchema = z.object({
    name: z.string().min(1, "O nome não pode ser vazio").max(150),
    email: z.string().email({message: "Formato de email inválido"}),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!"),
    role: z.nativeEnum(UserRole, {message: "Papel do usuário inválido"}).optional(),

});

export const userParamsSchema = z.object({
    id: z.string().uuid("O ID deve ser um formato UUID válido!")
});

export const userQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
});

export const userUpdateBodySchema = userBodySchema.partial();

export type UserBodyDTO = z.infer<typeof userBodySchema>;
export type UserUpdateBodyDTO = z.infer<typeof userUpdateBodySchema>;
export type UserParamsSchemaDTO = z.infer<typeof userParamsSchema>;
export type UserQuerySchemaDTO = z.infer<typeof userQuerySchema>;