import express from 'express'
import { order, orderTrackingById, updateOrderStatus } from '../controllers/orderController.js';
const router = express.Router();


router.post('/orders',order)
router.get('/orders/:orderId',orderTrackingById)
router.patch('/orders/:orderId/status', updateOrderStatus);
export default router;