import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

/* ROUTE IMPORTS */
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import salesRoutes from "./routes/salesRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
// import expenseRoutes from "./routes/expenseRoutes";

/* CONFIGURATION */
dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ Enable CORS for all origins
app.use(cors({ origin: "*" }));

/* ROUTES */
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/api", salesRoutes);
app.use("/", inventoryRoutes);
// app.use("/expenses", expenseRoutes);

app.get("/get", (req: Request, res: Response) => {
  res.send("Hello world");
});

// ✅ Database connection test route
app.get("/db-test", async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.status(200).send("✅ Database connection successful!");
  } catch (error: unknown) {
    console.error("❌ Database connection failed:", error);
    if (error instanceof Error) {
      res.status(500).send("❌ Database connection failed: " + error.message);
    } else {
      res.status(500).send("❌ Database connection failed: Unknown error");
    }
  } finally {
    await prisma.$disconnect();
  }
});

/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

export default app;



// import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";

// /* ROUTE IMPORTS */
// import dashboardRoutes from "./routes/dashboardRoutes";
// import productRoutes from "./routes/productRoutes";
// import userRoutes from "./routes/userRoutes";
// import salesRoutes from "./routes/salesRoutes";
// import inventoryRoutes from "./routes/inventoryRoutes";
// // import expenseRoutes from "./routes/expenseRoutes";

// /* CONFIGURATION */
// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // ✅ Enable CORS for all origins
// app.use(cors({ origin: "*" }));

// /* ROUTES */
// app.use("/dashboard", dashboardRoutes);
// app.use("/products", productRoutes);
// app.use("/users", userRoutes);
// app.use("/api", salesRoutes);
// app.use("/", inventoryRoutes);
// // app.use("/expenses", expenseRoutes);

// app.get("/get", (req, res) => {
//   res.send("Hello world");
// });

// /* SERVER */
// const port = Number(process.env.PORT) || 3001;
// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server running on port ${port}`);
// });

// export default app;
