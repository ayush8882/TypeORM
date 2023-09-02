import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string


    //since a company can have multiple products thus we will create an array of products

    @OneToMany(() => Product, (product) => product.company, {onDelete : "CASCADE"})
    products: Product[];
}