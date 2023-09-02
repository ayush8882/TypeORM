import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Company } from "../entity/Company";
import { Product } from "../entity/Product";
import { Seller } from "../entity/Seller";

const productRepo = AppDataSource.getRepository(Product);
const companyRepo = AppDataSource.getRepository(Company);
const sellerRepo = AppDataSource.getRepository(Seller);

export const addSeller = async (req: Request, res: Response) => {
  // const product = new Product();
  // product.name = req.body.productName;
  const product = await productRepo
    .createQueryBuilder("product")
    .where("product.name = :name", { name: req.body.productName })
    .getOne();
  console.log(product);

  const seller = new Seller();
  seller.name = req.body.name;
  seller.type = req.body.type;
  seller.products = [product];
  product.sellers = [seller];

  console.log(seller);
  console.log(product);

  try {
    await productRepo.save(product);
    await sellerRepo.save(seller);
    res.status(201).json({ msg: "Seller added successfully." });
  } catch (err) {
    console.log("Error encountered : ", err);
    res.status(500).json({ msg: "ISE" });
  }
};

export const findSeller = async (req: Request, res: Response) => {
  const sellerFound = await sellerRepo
    .createQueryBuilder("seller")
    .leftJoinAndSelect("seller.products", "product")
    .getMany();
  console.log(sellerFound);
  res.json({ sellerFound });
};

export const deleteSeller = async (req: Request, res: Response) => {
  const sellerDeleted = await sellerRepo
    .createQueryBuilder()
    .delete()
    .from("seller")
    .where("seller.name = :name", { name: req.body.sellerName })
    .execute();

  res.json({ msg: "Seller deleted" });
};

export const updateSeller = async (req: Request, res: Response) => {
  try {
    const product = await sellerRepo
      .createQueryBuilder()
      .update(Seller)
      .set({ name: req.body.name, type: req.body.type })
      .where("seller.name = :name", { name: req.body.sellerName })
      .execute();
    res.json({ msg: "Seller Updated" });
  } catch {
    res.json({ msg: "Bad request" });
  }
};
