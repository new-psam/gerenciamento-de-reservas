import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./models/user.interface";
import { UserRole } from "@/enums/userRole";
import { Reservation } from "./reservation.entity";



@Entity({
    name: 'users'
})
export class User implements IUser {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id'
    })
    id?: string | undefined;

    @Column({
                name: 'name',
                type: 'varchar',
                length: 150,
            })
    name: string;

    @Column({
            name: 'email',
            type: 'varchar',
            length: 150,
            unique: true,
            nullable: false,
            
        })
    email: string;

    @Column({
            name: 'password',
            type: 'varchar',
            length: 100,
            nullable: false,
        })
    password: string;

    @Column({
            name: 'role',
            type: 'enum',
            enum: UserRole,
            default: UserRole.CLIENT

        })
    role: UserRole;
    
    @OneToMany(() => Reservation, reservation=> reservation.users)
    reservations!: Reservation[];
}