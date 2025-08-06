import express from "express";
import { createSale, getSales, updateSaleStatus } from "../controllers/SalesController";

const router = express.Router();

router.post("/sales", createSale);
router.get("/sales", getSales);
router.put("/sales/:id/status", updateSaleStatus); // 👈 NEW: Update sale status

export default router;
