import AppDataSource from "../data-source";
import { Company } from "../entity/Company";
import { Product } from "../entity/Product";
import {Request, Response} from 'express';

const companyRepo = AppDataSource.getRepository(Company);

export const addCompany = async(req: Request, res: Response) => {
  let company: Company = new Company();
  company.name = req.body.name
  company.description = req.body.description
  const dataInserted = await companyRepo.save(company);
  res.json({dataInserted});
};

export const findCompany = async (req: Request, res: Response) => {
    const companyFound = await companyRepo
    .createQueryBuilder("company")
    .leftJoinAndSelect("company.products", "products")
    .where("company.id = :id", { id: req.body.id })
    .getMany();

res.json({companyFound});
}

export const deleteCompany =  async (req: Request, res: Response) => {
  const companyDeleted = await companyRepo
  .createQueryBuilder()
  .delete()
  .from("company")
  .where("company.name = :name", { name: req.body.companyName })
  .execute()

  res.json({msg : "Company deleted"})
};

export const updateCompany = async (req: Request, res: Response) => {
  const company =  await companyRepo
  .createQueryBuilder("company")
  .where("company.name = :companyName", { companyName: req.body.companyName })
  .getOne();
  
  if(company != null){
    company.name = req.body.updatedCompanyName;
    const dataChanged = await companyRepo.save(company);
    res.json({msg: dataChanged})
  }
  else{
    res.json({msg: "Company not found!"})
  }
}




