"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/inventory.routes.ts
const express_1 = __importDefault(require("express"));
const inventoryControllers_1 = require("../controllers/inventoryControllers");
const router = express_1.default.Router();
router.get("/inventory", inventoryControllers_1.getInventory);
exports.default = router;
