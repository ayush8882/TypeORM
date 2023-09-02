import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Company } from "../entity/Company";
import { Product } from "../entity/Product";

const productRepo = AppDataSource.getRepository(Product);
const companyRepo = AppDataSource.getRepository(Company);

export const addProduct = async (req: Request, res: Response) => {
  const product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  const company = await companyRepo
    .createQueryBuilder("company")
    .leftJoinAndSelect("company.products", "products")
    .where("company.name = :name", { name: req.body.companyName })
    .getOne();
  console.log(company);
  company.products.push(product);
  product.company = company;
  try {
    await productRepo.save(product);
    await companyRepo.save(company);
    res.status(201).json({ msg: "Product added successfully." });
  } catch (err) {
    console.log("Error encountered : ", err);
    res.status(500).json({ msg: "ISE" });
  }
};

export const findProduct = async (req: Request, res: Response) => {
  const productFound = await productRepo
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.sellers", "seller")
    .where("product.name = :name", { name: req.body.productName })
    .getOne();

  res.json({ productFound });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productDeleted = await productRepo
    .createQueryBuilder()
    .delete()
    .from("product")
    .where("product.name = :name", { name: req.body.productName })
    .execute();

  res.json({ msg: "Product deleted" });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productRepo
      .createQueryBuilder()
      .update(Product)
      .set({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      })
      .where("product.name = :productName", {
        productName: req.body.productName,
      })
      .execute();
    res.json({ msg: "Product Updated" });
  } catch {
    res.json({ msg: "Bad request" });
  }
};
