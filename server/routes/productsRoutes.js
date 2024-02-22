import express from "express";
const router = express.Router();
import {
  getProducts, getProductById, createProduct, deleteProduct, updateProduct
} from "../controllers/productsControllers.js";

// Define routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
