import * as express from 'express';
import { Router } from 'express';
import { addCompany, deleteCompany, findCompany, updateCompany } from '../controllers/CompanyController';
import { addProduct, deleteProduct, findProduct, updateProduct } from '../controllers/ProductController';
import { addSeller, deleteSeller, findSeller, updateSeller } from '../controllers/SellerController';

const router: Router = Router();

router.post('/addCompany', addCompany);
router.post('/addProduct', addProduct)
router.post('/findCompany', findCompany)
router.post('/findProduct', findProduct)
router.post('/deleteCompany', deleteCompany)
router.post('/deleteProduct', deleteProduct)
router.post('/updateCompany', updateCompany)
router.post('/updateProduct', updateProduct)
router.post('/addSeller', addSeller)
router.post('/findSeller', findSeller)
router.post('/deleteSeller', deleteSeller)
router.post('/updateSeller', updateSeller)

export default router;