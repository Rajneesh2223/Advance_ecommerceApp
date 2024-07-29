import express from 'express'
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
const router = express.Router();


router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id',updateProduct)
router.delete('/products/:id',deleteProductById)


export default router;