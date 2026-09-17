import { Router } from 'express';
import { EcommerceController } from './ecommerce.controller';
import { authenticate, authorize, checkResourceOwnership } from '../app/middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// Public / Client Accessible Products
router.get('/products', authorize('ADMIN', 'CLIENT'), EcommerceController.getProducts);

// Client Specific Operations (Isolated per CLIENT)
router.get('/cart', authorize('ADMIN', 'CLIENT'), EcommerceController.getCart);
router.post('/checkout', authorize('ADMIN', 'CLIENT'), EcommerceController.checkout);
router.get('/orders', authorize('ADMIN', 'CLIENT'), EcommerceController.getMyOrders);
router.get('/orders/:id', authorize('ADMIN', 'CLIENT'), checkResourceOwnership('id'), EcommerceController.getMyOrders);

export default router;
