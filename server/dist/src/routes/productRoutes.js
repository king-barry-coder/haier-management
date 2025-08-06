"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productContoller_1 = require("../controllers/productContoller");
const router = (0, express_1.Router)();
router.get("/", productContoller_1.getProducts);
router.post("/", productContoller_1.createProduct);
router.delete("/:id", productContoller_1.deleteProduct);
exports.default = router;
