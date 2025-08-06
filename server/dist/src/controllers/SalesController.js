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
exports.updateSaleStatus = exports.getSales = exports.createSale = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new sale
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerName, address, email, phone, products } = req.body;
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products provided." });
        }
        const sale = yield prisma.sale.create({
            data: {
                customerName,
                address,
                email,
                phone,
                status: "pending",
                // createdAt is handled automatically by Prisma's @default(now())
                items: {
                    create: products.map((p) => ({
                        productId: p.productId,
                        quantity: p.quantity,
                        price: p.price,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true, // include product details
                    },
                },
            },
        });
        res.status(201).json(sale);
    }
    catch (err) {
        console.error("Create sale error:", err);
        res.status(500).json({ message: "Failed to create sale" });
    }
});
exports.createSale = createSale;
// Get all sales with full detail
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield prisma.sale.findMany({
            include: {
                items: {
                    include: {
                        product: true, // include product details
                    },
                },
            },
            orderBy: {
                createdAt: "desc", // sort by creation date
            },
        });
        res.status(200).json(sales);
    }
    catch (err) {
        console.error("Get sales error:", err);
        res.status(500).json({ message: "Failed to fetch sales" });
    }
});
exports.getSales = getSales;
// Update sale status
const updateSaleStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // ID is a UUID string
    const { status } = req.body;
    if (!["pending", "active", "delivered"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }
    try {
        const updatedSale = yield prisma.sale.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.status(200).json(updatedSale);
    }
    catch (err) {
        console.error("Update sale status error:", err);
        res.status(500).json({ message: "Failed to update sale status" });
    }
});
exports.updateSaleStatus = updateSaleStatus;
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// // Create a new sale
// export const createSale = async (req: Request, res: Response) => {
//   try {
//     const { customerName, address, email, phone, products } = req.body;
//     if (!products || products.length === 0) {
//       return res.status(400).json({ message: "No products provided." });
//     }
//     const sale = await prisma.sale.create({
//       data: {
//         customerName,
//         address,
//         email,
//         phone,
//         status: "pending",
//         items: {
//           create: products.map((p: any) => ({
//             productId: p.productId,
//             quantity: p.quantity,
//             price: p.price,
//           })),
//         },
//       },
//       include: {
//         items: {
//           include: {
//             product: true, // include product details
//           },
//         },
//       },
//     });
//     res.status(201).json(sale);
//   } catch (err) {
//     console.error("Create sale error:", err);
//     res.status(500).json({ message: "Failed to create sale" });
//   }
// };
// // Get all sales with full detail
// export const getSales = async (req: Request, res: Response) => {
//   try {
//     const sales = await prisma.sale.findMany({
//       include: {
//         items: {
//           include: {
//             product: true, // include product details
//           },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });
//     res.status(200).json(sales);
//   } catch (err) {
//     console.error("Get sales error:", err);
//     res.status(500).json({ message: "Failed to fetch sales" });
//   }
// };
// // Update sale status (FIXED to treat id as string)
// export const updateSaleStatus = async (req: Request, res: Response) => {
//   const { id } = req.params; // ✅ ID is a string
//   const { status } = req.body;
//   if (!["pending", "active", "delivered"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status value" });
//   }
//   try {
//     const updatedSale = await prisma.sale.update({
//       where: { id }, // ✅ no parseInt needed
//       data: { status },
//       include: {
//         items: {
//           include: {
//             product: true, // include product details
//           },
//         },
//       },
//     });
//     res.status(200).json(updatedSale);
//   } catch (err) {
//     console.error("Update sale status error:", err);
//     res.status(500).json({ message: "Failed to update sale status" });
//   }
// };
