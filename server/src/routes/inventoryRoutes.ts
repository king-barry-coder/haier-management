// routes/inventory.routes.ts
import express from "express";
import { getInventory } from "../controllers/inventoryControllers";

const router = express.Router();

router.get("/", getInventory);

export default router;
