"use client";

import { useGetInventoryQuery } from "../../app/state/api";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 130,
    type: "number",
  },
  {
    field: "soldQuantity",
    headerName: "Sold Quantity",
    width: 130,
    type: "number",
  },
  {
    field: "remainingQuantity",
    headerName: "Remaining",
    width: 130,
    type: "number",
  },
];

const Inventory = () => {
  const { data: inventory, isError, isLoading } = useGetInventoryQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !inventory) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch inventory
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={inventory}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;






// "use client";

// import { useGetProductsQuery } from "@/app/state/api";
// import Header from "../../components/Header";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//   { field: "productId", headerName: "ID", width: 90 },
//   { field: "name", headerName: "Product Name", width: 200 },
//   {
//     field: "price",
//     headerName: "Price",
//     width: 110,
//     type: "number",
//     valueGetter: (value, row) => `$${row.price}`,
//   },
//   {
//     field: "rating",
//     headerName: "Rating",
//     width: 110,
//     type: "number",
//     valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
//   },
//   {
//     field: "stockQuantity",
//     headerName: "Stock Quantity",
//     width: 150,
//     type: "number",
//   },
// ];

// const Inventory = () => {
//   const { data: products, isError, isLoading } = useGetProductsQuery();

//   if (isLoading) {
//     return <div className="py-4">Loading...</div>;
//   }

//   if (isError || !products) {
//     return (
//       <div className="text-center text-red-500 py-4">
//         Failed to fetch products
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col">
//       <Header name="Inventory" />
//       <DataGrid
//         rows={products}
//         columns={columns}
//         getRowId={(row) => row.productId}
//         checkboxSelection
//         className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
//       />
//     </div>
//   );
// };

// export default Inventory;