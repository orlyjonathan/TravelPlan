import express from 'express';
import { addToCart, deleteFromCart, getCart, updateCart } from '../../controllers/cart/cartCont';
const router = express.Router();


router.post("/add-to-cart", addToCart);
router.get("/:userId", getCart);
router.delete('/:userId/delete/:productId', deleteFromCart);
router.put('/update-cart', updateCart);


export default router;