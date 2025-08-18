import express from "express";
import { createSale, getSales, updateSaleStatus } from "../controllers/SalesController";

const router = express.Router();

router.post("/", createSale);
router.get("/", getSales);
router.put("/:id/status", updateSaleStatus); // 👈 NEW: Update sale status

export default router;
