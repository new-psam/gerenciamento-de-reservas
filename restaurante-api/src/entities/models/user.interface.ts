import { UserRole } from "@/enums/userRole"

export interface IUser {
    id?: string
    name: string
    email: string
    password: string
    role: UserRole
}