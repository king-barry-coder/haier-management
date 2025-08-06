// controllers/inventory.controller.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";



const prisma = new PrismaClient();

export const getInventory = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany({
      include: {
        saleItems: {
          include: {
            sale: true,
          },
        },
      },
    });

    const inventory = products.map((product: { saleItems: any[]; productId: any; name: any; price: any; rating: any; stockQuantity: number; }) => {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};
