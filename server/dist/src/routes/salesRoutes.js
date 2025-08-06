"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SalesController_1 = require("../controllers/SalesController");
const router = express_1.default.Router();
router.post("/sales", SalesController_1.createSale);
router.get("/sales", SalesController_1.getSales);
router.put("/sales/:id/status", SalesController_1.updateSaleStatus); // 👈 NEW: Update sale status
exports.default = router;
