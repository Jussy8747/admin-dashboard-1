import express from "express";
import {
  getProduct,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controller/client.js";
const router = express.Router();

router.get("/products", getProduct);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
