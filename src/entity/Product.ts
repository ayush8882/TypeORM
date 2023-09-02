import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Company } from './Company';
import { Seller } from './Seller';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(()=> Company, (company) => company.products)
  @JoinColumn() 
  company: Company;

  @ManyToMany(()=> Seller, (seller) => seller.products)
  @JoinTable()
  sellers: Seller[];
}
