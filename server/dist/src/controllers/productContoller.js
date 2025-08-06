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
exports.deleteProduct = exports.createProduct = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const products = yield prisma.products.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = yield prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield prisma.products.findUnique({
            where: { productId: id },
        });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        yield prisma.products.delete({
            where: { productId: id },
        });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Error deleting product" });
    }
});
exports.deleteProduct = deleteProduct;
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export const getProducts = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const search = req.query.search?.toString();
//     const products = await prisma.products.findMany({
//       where: {
//         name: {
//           contains: search,
//         },
//       },
//     });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving products" });
//   }
// };
// export const createProduct = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { productId, name, price, rating, stockQuantity } = req.body;
//     const product = await prisma.products.create({
//       data: {
//         productId,
//         name,
//         price,
//         rating,
//         stockQuantity,
//       },
//     });
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating product" });
//   }
// };
