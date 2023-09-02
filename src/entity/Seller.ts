import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @Column()
  type: string;   //what type of seller we have, like, gadgets seller, clothes seller etc.

  @ManyToMany(()=> Product, (product) => product.sellers)
  products: Product[];
}
