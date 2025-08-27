"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface SaleItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Sale {
  id: string;
  customerName: string;
  phone?: string;
  email?: string;
  address?: string;
  status: "pending" | "active" | "delivered";
  items: SaleItem[];
  createdAt: string;
}

export default function PendingOrders() {
  const [orders, setOrders] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch pending orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales?status=pending`
      );
      let data: Sale[] = await res.json();

      // Ensure only pending orders are kept
      data = data.filter(order => order.status === "pending");

      setOrders(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Mark order as active
  const handleStatusUpdate = async (id: string) => {
    // Optimistically remove the order
    setOrders(prev => prev.filter(order => order.id !== id));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "active" }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      fetchOrders();
    } catch (err) {
      console.error("Status update error:", err);
      fetchOrders();
    }
  };

  // Cancel order (update status to "cancelled")
  const handleCancel = async (id: string) => {
    // Optimistically remove the order
    setOrders(prev => prev.filter(order => order.id !== id));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancelled" }),
        }
      );

      if (!res.ok) throw new Error("Failed to cancel order");

      fetchOrders();
    } catch (err) {
      console.error("Cancel error:", err);
      fetchOrders();
    }
  };

  if (loading) return <p className="p-6">Loading pending orders...</p>;

  return (
    <div className="p-6 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">All Pending Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No pending orders</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {orders.map(order => {
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order.id}
                className="border p-4 rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold">{order.customerName}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  📞 {order.phone || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  📧 {order.email || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  📍 {order.address || "N/A"}
                </p>

                <div className="mt-2">
                  <h4 className="font-semibold underline">Products:</h4>
                  {order.items.map(item => (
                    <div
                      key={item.id}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      🛒 {item.product.name} - Qty: {item.quantity} - Price: $
                      {item.price}
                    </div>
                  ))}
                </div>

                <p className="mt-2 font-semibold">Total: ${total.toFixed(2)}</p>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(order.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Mark as Active
                  </button>
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}



// "use client";

// import React, { useEffect, useState } from "react";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// interface SaleItem {
//   id: string;
//   quantity: number;
//   price: number;
//   product: Product;
// }

// interface Sale {
//   id: string;
//   customerName: string;
//   phone?: string;
//   email?: string;
//   address?: string;
//   status: "pending" | "active" | "delivered";
//   items: SaleItem[];
//   createdAt: string;
// }

// export default function PendingOrders() {
//   const [orders, setOrders] = useState<Sale[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales?status=pending`
//       );
//       let data: Sale[] = await res.json();

//       // Ensure only pending orders are kept
//       data = data.filter(order => order.status === "pending");

//       setOrders(data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleStatusUpdate = async (id: string) => {
//     // Optimistically remove the order
//     setOrders(prev => prev.filter(order => order.id !== id));

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales/${id}/status`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: "active" }),
//         }
//       );

//       if (!res.ok) throw new Error("Failed to update status");

//       // Fetch again after backend confirms
//       fetchOrders();
//     } catch (err) {
//       console.error("Status update error:", err);
//       // Rollback: refetch in case update failed
//       fetchOrders();
//     }
//   };

//   if (loading) return <p className="p-6">Loading pending orders...</p>;

//   return (
//     <div className="p-6 text-gray-900 dark:text-white">
//       <h1 className="text-2xl font-bold mb-6">All Pending Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-700 dark:text-gray-300">No pending orders</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {orders.map(order => {
//             const total = order.items.reduce(
//               (sum, item) => sum + item.price * item.quantity,
//               0
//             );

//             return (
//               <div
//                 key={order.id}
//                 className="border p-4 rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700"
//               >
//                 <h3 className="text-lg font-bold">{order.customerName}</h3>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   📞 {order.phone || "N/A"}
//                 </p>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   📧 {order.email || "N/A"}
//                 </p>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   📍 {order.address || "N/A"}
//                 </p>

//                 <div className="mt-2">
//                   <h4 className="font-semibold underline">Products:</h4>
//                   {order.items.map(item => (
//                     <div
//                       key={item.id}
//                       className="text-gray-700 dark:text-gray-300"
//                     >
//                       🛒 {item.product.name} - Qty: {item.quantity} - Price: ₦
//                       {item.price}
//                     </div>
//                   ))}
//                 </div>

//                 <p className="mt-2 font-semibold">Total: ₦{total.toFixed(2)}</p>

//                 <button
//                   onClick={() => handleStatusUpdate(order.id)}
//                   className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Mark as Active
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

