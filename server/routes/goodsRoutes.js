import express from "express";
const router = express.Router();
import {
  getGoods,
  createGood,
  deleteGood,
  editGood,
} from "../controllers/goodsControllers.js";

// Get all Goods
router.get("/", getGoods);

// Create a new Good
router.post("/", createGood);

// Delete a Good by ID
router.delete("/:id", deleteGood);

// Edit a Good by ID
router.patch("/:id", editGood);

export default router;
