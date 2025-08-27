import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../utils/mailer";
import { buildOrderEmail } from "../utils/emailTemplates";

const prisma = new PrismaClient();

// Create a new sale
export const createSale = async (req: Request, res: Response) => {
  try {
    const { customerName, address, email, phone, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided." });
    }

    const sale = await prisma.sale.create({
      data: {
        customerName,
        address,
        email,
        phone,
        status: "pending",
        items: {
          create: products.map((p: any) => ({
            productId: p.productId,
            quantity: p.quantity,
            price: p.price,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });

    const { subject, html } = buildOrderEmail(sale, "created");
    await sendEmail(sale.email, subject, html);

    res.status(201).json(sale);
  } catch (err) {
    console.error("Create sale error:", err);
    res.status(500).json({ message: "Failed to create sale" });
  }
};

// Get all sales with full detail
export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await prisma.sale.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(sales);
  } catch (err) {
    console.error("Get sales error:", err);
    res.status(500).json({ message: "Failed to fetch sales" });
  }
};

// Update sale status (supports cancellation)
export const updateSaleStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "active", "delivered", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    let updatedSale;

    if (status === "cancelled") {
      // First delete related SaleItems
      await prisma.saleItem.deleteMany({ where: { saleId: id } });

      // Then delete the sale itself
      updatedSale = await prisma.sale.delete({ where: { id } });

      // Optional: send cancellation email
      const { subject, html } = buildOrderEmail(updatedSale, "cancelled");
      await sendEmail(updatedSale.email, subject, html);
    } else {
      // Update status normally for pending, active, delivered
      updatedSale = await prisma.sale.update({
        where: { id },
        data: { status },
        include: { items: { include: { product: true } } },
      });

      const { subject, html } = buildOrderEmail(updatedSale, status as any);
      await sendEmail(updatedSale.email, subject, html);
    }

    res.status(200).json(updatedSale);
  } catch (err) {
    console.error("Update sale status error:", err);
    res.status(500).json({ message: "Failed to update sale status" });
  }
};


// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { sendEmail } from "../utils/mailer"; 
// import { buildOrderEmail } from "../utils/emailTemplates"; // ✅ now imported

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
//         items: { include: { product: true } },
//       },
//     });

//     // ✅ send order confirmation email
//     const { subject, html } = buildOrderEmail(sale, "created");
//     await sendEmail(sale.email, subject, html);

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
//       include: { items: { include: { product: true } } },
//       orderBy: { createdAt: "desc" },
//     });

//     res.status(200).json(sales);
//   } catch (err) {
//     console.error("Get sales error:", err);
//     res.status(500).json({ message: "Failed to fetch sales" });
//   }
// };

// // Update sale status
// export const updateSaleStatus = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["pending", "active", "delivered", "cancelled"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status value" });
//   }

//   try {
//     const updatedSale = await prisma.sale.update({
//       where: { id },
//       data: { status },
//       include: { items: { include: { product: true } } },
//     });

//     // ✅ send status update emails
//     if (["active", "delivered", "cancelled"].includes(status)) {
//       const { subject, html } = buildOrderEmail(updatedSale, status as any);
//       await sendEmail(updatedSale.email, subject, html);
//     }

//     res.status(200).json(updatedSale);
//   } catch (err) {
//     console.error("Update sale status error:", err);
//     res.status(500).json({ message: "Failed to update sale status" });
//   }
// };



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
//         // createdAt is handled automatically by Prisma's @default(now())
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
//       orderBy: {
//         createdAt: "desc", // sort by creation date
//       },
//     });

//     res.status(200).json(sales);
//   } catch (err) {
//     console.error("Get sales error:", err);
//     res.status(500).json({ message: "Failed to fetch sales" });
//   }
// };

// // Update sale status
// export const updateSaleStatus = async (req: Request, res: Response) => {
//   const { id } = req.params; // ID is a UUID string
//   const { status } = req.body;

//   if (!["pending", "active", "delivered"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status value" });
//   }

//   try {
//     const updatedSale = await prisma.sale.update({
//       where: { id },
//       data: { status },
//       include: {
//         items: {
//           include: {
//             product: true,
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



