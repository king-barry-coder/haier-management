// api.ts 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ---- Interfaces ----

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategoryId: string;
  category: string;
  amount: number;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface InventoryItem {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
  soldQuantity: number;
  remainingQuantity: number;
}

export interface CreateSaleRequest {
  customerName: string;
  customerEmail: string;
  products: { productId: string; quantity: number }[];
}

export interface CreateSaleResponse {
  message: string;
  saleId: string;
}

// ---- API Setup ----

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["DashboardMetrics", "Products", "Sales"],
  endpoints: (build) => ({
    // 👉 Dashboard
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),

    // 👉 Products
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),

    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // 👉 Sales
    createSale: build.mutation<CreateSaleResponse, CreateSaleRequest>({
      query: (saleData) => ({
        url: "/sales",
        method: "POST",
        body: saleData,
      }),
      invalidatesTags: ["Sales"],
    }),

    // 👉 Inventory
    getInventory: build.query<InventoryItem[], void>({
      query: () => "/inventory",
      providesTags: ["Products"],
    }),
  }),
});

// ---- Auto-generated Hooks ----

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useCreateSaleMutation,
  useGetInventoryQuery,
} = api;




// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // ---- Interfaces ----
// export interface Product {
//   productId: string;
//   name: string;
//   price: number;
//   rating?: number;
//   stockQuantity: number;
// }

// export interface NewProduct {
//   name: string;
//   price: number;
//   rating?: number;
//   stockQuantity: number;
// }

// export interface SalesSummary {
//   salesSummaryId: string;
//   totalValue: number;
//   changePercentage?: number;
//   date: string;
// }

// export interface PurchaseSummary {
//   purchaseSummaryId: string;
//   totalPurchased: number;
//   changePercentage?: number;
//   date: string;
// }

// export interface ExpenseSummary {
//   expenseSummaryId: string;
//   totalExpenses: number;
//   date: string;
// }

// export interface ExpenseByCategorySummary {
//   expenseByCategoryId: string;
//   category: string;
//   amount: number;
//   date: string;
// }

// export interface DashboardMetrics {
//   popularProducts: Product[];
//   salesSummary: SalesSummary[];
//   purchaseSummary: PurchaseSummary[];
//   expenseSummary: ExpenseSummary[];
//   expenseByCategorySummary: ExpenseByCategorySummary[];
// }

// // ✅ Inventory interface
// export interface InventoryItem {
//   productId: string;
//   name: string;
//   price: number;
//   rating?: number;
//   stockQuantity: number;
//   soldQuantity: number;
//   remainingQuantity: number;
// }

// // ---- API Setup ----
// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
//   reducerPath: "api",
//   tagTypes: ["DashboardMetrics", "Products", "Sales"],
//   endpoints: (build) => ({
//     // 👉 Dashboard
//     getDashboardMetrics: build.query<DashboardMetrics, void>({
//       query: () => "/dashboard",
//       providesTags: ["DashboardMetrics"],
//     }),

//     // 👉 Products
//     getProducts: build.query<Product[], string | void>({
//       query: (search) => ({
//         url: "/products",
//         params: search ? { search } : {},
//       }),
//       providesTags: ["Products"],
//     }),

//     createProduct: build.mutation<Product, NewProduct>({
//       query: (newProduct) => ({
//         url: "/products",
//         method: "POST",
//         body: newProduct,
//       }),
//       invalidatesTags: ["Products"],
//     }),

//     deleteProduct: build.mutation<{ message: string }, string>({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Products"],
//     }),

//     createSale: build.mutation<any, any>({
//       query: (saleData) => ({
//         url: "/sales",
//         method: "POST",
//         body: saleData,
//       }),
//       invalidatesTags: ["Sales"],
//     }),

//     // ✅ Inventory endpoint
//     getInventory: build.query<InventoryItem[], void>({
//       query: () => "/inventory",
//       providesTags: ["Products"],
//     }),
//   }),
// });

// // ---- Hooks ----
// export const {
//   useGetDashboardMetricsQuery,
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useDeleteProductMutation,
//   useCreateSaleMutation,
//   useGetInventoryQuery, // ✅ Exported hook
// } = api;



