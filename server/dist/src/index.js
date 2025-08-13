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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
/* ROUTE IMPORTS */
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const salesRoutes_1 = __importDefault(require("./routes/salesRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
// import expenseRoutes from "./routes/expenseRoutes";
/* CONFIGURATION */
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// ✅ Enable CORS for all origins
app.use((0, cors_1.default)({ origin: "*" }));
/* ROUTES */
app.use("/dashboard", dashboardRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/api", salesRoutes_1.default);
app.use("/", inventoryRoutes_1.default);
// app.use("/expenses", expenseRoutes);
app.get("/get", (req, res) => {
    res.send("Hello world");
});
// ✅ Database connection test route
app.get("/db-test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        res.status(200).send("✅ Database connection successful!");
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        if (error instanceof Error) {
            res.status(500).send("❌ Database connection failed: " + error.message);
        }
        else {
            res.status(500).send("❌ Database connection failed: Unknown error");
        }
    }
    finally {
        yield prisma.$disconnect();
    }
}));
/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
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
