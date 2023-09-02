import "reflect-metadata"
import { DataSource } from "typeorm"
import { Company } from "./entity/Company"
import { Product } from "./entity/Product"
import { Seller } from "./entity/Seller"

const AppDataSource = new DataSource({ 
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Ayush@123",
    database: "Relational",
    synchronize: false,
    logging: false,
    entities: [Company, Product, Seller]
})

AppDataSource.initialize()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => console.log(error));

export default AppDataSource;
