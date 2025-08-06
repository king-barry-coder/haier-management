"use client";

import React, { useState } from "react";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Header from "../../components/Header";
import Rating from "../../components/ratings";
import CreateProductModal from "./CreateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/app/state/api";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string>("");

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
    setIsCreateModalOpen(false);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (selectedProductId) {
      await deleteProduct(selectedProductId);
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-0 border-gray-200 rounded bg-white  dark:bg-black">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white dark:bg-black"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Product
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {products.map((product) => {
      const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(product.name)}/150`;



  return (
    <div
      key={product.productId}
      className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
    >
      <div className="flex flex-col items-center">
        <Image
          src={imageUrl}
          alt={product.name}
          width={150}
          height={150}
          className="mb-3 rounded-2xl w-36 h-36 object-cover "
        />
        <h3 className="text-lg text-gray-900 font-semibold dark:text-white">{product.name}</h3>
        <p className="text-gray-800  dark:text-white">${product.price.toFixed(2)}</p>
        <div className="text-sm text-black dark:text-white mt-1">
          Stock: {product.stockQuantity}
        </div>
        {product.rating && product.rating > 0 && (
          <div className="flex items-center mt-2">
            <Rating rating={product.rating} />
          </div>
        )}
        <button
          onClick={() => handleDeleteClick(product.productId, product.name)}
          className="mt-3 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
})}
      </div>

      {/* CREATE MODAL */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProduct}
      />

      {/* DELETE MODAL */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDeleteProduct}
        productName={selectedProductName}
      />
    </div>
  );
};

export default Products;











// "use client";

// import { useCreateProductMutation, useGetProductsQuery } from "@/app/state/api";
// import { PlusCircleIcon, SearchIcon } from "lucide-react";
// import { useState } from "react";
// import Header from "../../components/Header";
// import Rating from "../../components/ratings";
// import CreateProductModal from "./CreateProductModal";
// import Image from "next/image";

// type ProductFormData = {
//   name: string;
//   price: number;
//   stockQuantity: number;
//   rating: number;
// };

// const Products = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     data: products,
//     isLoading,
//     isError,
//   } = useGetProductsQuery(searchTerm);

//   const [createProduct] = useCreateProductMutation();

//   const handleCreateProduct = async (productData: ProductFormData) => {
//     await createProduct(productData);
//   };

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
//     <div className="mx-auto pb-5 w-full">
//       {/* SEARCH BAR */}
//       <div className="mb-6">
//         <div className="flex items-center border-2 border-gray-200 rounded">
//           <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
//           <input
//             className="w-full py-2 px-4 rounded bg-white"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* HEADER BAR */}
//       <div className="flex justify-between items-center mb-6">
//         <Header name="Products" />
//         <button
//           className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create Product
//         </button>
//       </div>

//       {/* PRODUCT GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
//         {products?.map((product) => {
//           const imgNumber = Math.floor(Math.random() * 3) + 1;
//           const imageUrl = `https://m.media-amazon.com/images/I/61IhpwY0R5L${imgNumber}.png`;

//           return (
//             <div
//               key={product.productId}
//               className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
//             >
//               <div className="flex flex-col items-center">
//                 <Image
//                   src={imageUrl}
//                   alt={product.name}
//                   width={150}
//                   height={150}
//                   className="mb-3 rounded-2xl w-36 h-36 object-contain"
//                 />
//                 <h3 className="text-lg text-gray-900 font-semibold">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-800">${product.price.toFixed(2)}</p>
//                 <div className="text-sm text-gray-600 mt-1">
//                   Stock: {product.stockQuantity}
//                 </div>
//                 {product.rating && (
//                   <div className="flex items-center mt-2">
//                     <Rating rating={product.rating} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* MODAL */}
//       <CreateProductModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreate={handleCreateProduct}
//       />
//     </div>
//   );
// };

// export default Products;
