import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ICuisine } from "./models/cuisine.interface";
import { Restaurant } from "./restaurant.entity";

@Entity({
    name: 'cuisine'
})
export class Cuisine implements ICuisine {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id'
    })
    id?: string | undefined;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 100
    })
    name: string;

    // Relacionamento: MUITOS para MUITOS com Restaurant.
    // O lado 'Cuisine' é o lado primário que define a tabela de junção.
    @ManyToMany(() => Restaurant, restaurant => restaurant.cuisines)
    @JoinTable({
        name: 'restaurant_cuisine', //nome da tabela Intermediária
        joinColumn: {
            name: 'cuisine_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'restaurant_id',
            referencedColumnName: 'id',
        },
        
    })
    restaurants!: Restaurant[];
    
}