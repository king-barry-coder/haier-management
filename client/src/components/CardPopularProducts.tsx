"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useGetDashboardMetricsQuery } from "@/app/state/api";
import Rating from "./ratings";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="bg-white dark:bg-black shadow-md rounded-2xl pb-6 border border-gray-200 dark:border-gray-800">
      {isLoading ? (
        <div className="m-5 text-gray-700 dark:text-gray-300">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-gray-800 dark:text-gray-100">
            Popular Products
          </h3>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="overflow-auto">
            {dashboardMetrics?.popularProducts?.slice(0, 7).map((product) => {
              const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(product.name)}/150`;

              return (
                <div
                  key={product.productId}
                  className="flex items-center justify-between gap-3 px-5 py-5 border-b border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-2xl w-11 h-11 object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700 dark:text-gray-100">
                        {product.name}
                      </span>
                      <div className="flex text-sm items-center">
                        <span className="font-bold text-blue-500 text-xs">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="mx-2 text-gray-400">|</span>
                        <Rating rating={product.rating || 0} />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs flex items-center">
                    <button className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-2">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <span className="text-gray-600 dark:text-gray-300">
                      {Math.round(product.stockQuantity / 1000)}k Sold
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;




// "use client";

// import { useGetDashboardMetricsQuery } from "@/app/state/api";
// import { ShoppingBag } from "lucide-react";
// import React from "react";
// import Rating from "./ratings";
// import Image from "next/image";

// const CardPopularProducts = () => {
//   const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

//   return (
//     <div className="bg-white dark:bg-black shadow-md rounded-2xl pb-6 border-1 border-gray-900">
//       {isLoading ? (
//         <div className="m-5 text-gray-700 dark:text-gray-300">Loading...</div>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-gray-800 dark:text-gray-100">
//             Popular Products
//           </h3>
//           <hr className="border-gray-200 dark:border-gray-700" />
//           <div className="overflow-auto">
//             {dashboardMetrics?.popularProducts?.slice(0, 7).map((product) => {
//               const imgNumber = Math.floor(Math.random() * 3) + 1;
//               const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(product.name)}/150`;

//               return (
//                 <div
//                   key={product.productId}
//                   className="flex items-center justify-between gap-3 px-5 py-5 border-b border-gray-100 dark:border-gray-700"
//                 >
//                   <div className="flex items-center gap-3">
//                     <Image
//                       src={imageUrl}
//                       alt={product.name}
//                       width={50}
//                       height={50}
//                       className="mb-3 rounded-2xl w-11 h-11 object-cover"
//                     />

//                     <div className="flex flex-col justify-between gap-1">
//                       <div className="font-bold text-gray-700 dark:text-gray-100">
//                         {product.name}
//                       </div>
//                       <div className="flex text-sm items-center">
//                         <span className="font-bold text-blue-500 text-xs">
//                           ${product.price}
//                         </span>
//                         <span className="mx-2 text-gray-400">|</span>
//                         <Rating rating={product.rating || 0} />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-xs flex items-center">
//                     <button className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-2">
//                       <ShoppingBag className="w-4 h-4" />
//                     </button>
//                     <span className="text-gray-600 dark:text-gray-300">
//                       {Math.round(product.stockQuantity / 1000)}k Sold
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CardPopularProducts;








