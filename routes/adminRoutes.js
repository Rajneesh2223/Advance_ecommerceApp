import express from 'express'
import { deleteOrder, deleteProduct, deleteUser, getAllOrders, getAllProducts, getAllUser } from '../controllers/adminController.js';

const router = express.Router();


router.get('/users',getAllUser)
router.delete('/users/:id',deleteUser);
router.get('/products',getAllProducts);
router.delete('/products/:id',deleteProduct);
router.get('/orders',getAllOrders)
router.get('/orders/:orderId',deleteOrder)


export default router ;