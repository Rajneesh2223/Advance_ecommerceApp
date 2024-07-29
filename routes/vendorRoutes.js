import express from 'express';
import {
    createVendorHandler,
    getVendorsHandler,
    getVendorByIdHandler,
    updateVendorHandler,
    deleteVendorHandler
} from '../controllers/vendorController.js';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/vendors', authenticateToken, isAdmin, createVendorHandler);
router.get('/vendors', authenticateToken, isAdmin, getVendorsHandler);
router.get('/vendors/:id', authenticateToken, isAdmin, getVendorByIdHandler);
router.put('/vendors/:id', authenticateToken, isAdmin, updateVendorHandler);
router.delete('/vendors/:id', authenticateToken, isAdmin, deleteVendorHandler);

export default router;
