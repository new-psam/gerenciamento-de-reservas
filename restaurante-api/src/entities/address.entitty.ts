import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IAddress } from "./models/address.interface";
import { Restaurant } from "./restaurant.entity";

@Entity({
        name: 'address',
    })
export class Address implements  IAddress {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id'
    })
    id?: string | undefined;

    @Column({
        name: 'street',
        type: 'varchar',
        length: 150,
    })
    street: string;
        
    @Column({
        name: 'city',
        type: 'varchar',
        length: 100,
    })
    city: string;

    @Column({
        name: 'state',
        type: 'varchar',
        length: 2,
    })
    state: string;

    @Column({
        name: 'zip_code',
        type: 'varchar',
        length: 10,
    })
    zip_code: string;

    // Relacionamento (Futuro): Um Endereço está associado a um Restaurante (One-to-One)
    @OneToOne(() => Restaurant, restaurant => restaurant.address)
    restaurant!: Restaurant;
}