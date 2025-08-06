"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventory = void 0;
// controllers/inventory.controller.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.products.findMany({
            include: {
                saleItems: {
                    include: {
                        sale: true,
                    },
                },
            },
        });
        const inventory = products.map((product) => {
            const soldQuantity = product.saleItems
                .filter((item) => item.sale.status === "delivered")
                .reduce((sum, item) => sum + item.quantity, 0);
            return {
                productId: product.productId,
                name: product.name,
                price: product.price,
                rating: product.rating,
                stockQuantity: product.stockQuantity,
                soldQuantity,
                remainingQuantity: product.stockQuantity - soldQuantity,
            };
        });
        res.json(inventory);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch inventory" });
    }
});
exports.getInventory = getInventory;
