"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

type SaleStatus = "pending" | "active" | "delivered";

type SaleItem = {
  id: number;
  product: { name: string };
  quantity: number;
  price: number;
};

type Sale = {
  id: number;
  customerName: string;
  address: string;
  email: string;
  phone: string;
  status: SaleStatus;
  items: SaleItem[];
  createdAt: string;
};

const SalesList = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/sales");
      const data = await res.json();
      setSales(data);
    } catch (error) {
      console.error("Failed to fetch sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: SaleStatus) => {
    try {
      await fetch(`http://localhost:8000/api/sales/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchSales();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const grouped: Record<SaleStatus, Sale[]> = {
    pending: [],
    active: [],
    delivered: [],
  };

  sales.forEach((sale) => {
    grouped[sale.status].push(sale);
  });

  const deliveredGroupedByDate: Record<string, Sale[]> = {};
  grouped.delivered.forEach((sale) => {
    const date = dayjs(sale.createdAt).format("MMMM D, YYYY");
    if (!deliveredGroupedByDate[date]) {
      deliveredGroupedByDate[date] = [];
    }
    deliveredGroupedByDate[date].push(sale);
  });

  const renderSale = (sale: Sale) => {
    const total = sale.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
      <div
        key={sale.id}
        className="border p-4 rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{sale.customerName}</h3>
        <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> {sale.address}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {sale.email}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {sale.phone}</p>

        <div className="mt-2">
          <h4 className="font-semibold underline text-gray-900 dark:text-white">Products:</h4>
          {sale.items.map((item) => (
            <div key={item.id} className="text-gray-700 dark:text-gray-300">
              🛒 {item.product.name} - Qty: {item.quantity} - Price: ₦{item.price}
            </div>
          ))}
        </div>

        <p className="mt-2 font-semibold text-gray-900 dark:text-white">
          Total: ₦{total.toFixed(2)}
        </p>

        <div className="mt-3">
          {sale.status === "pending" && (
            <button
              onClick={() => updateStatus(sale.id, "active")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
            >
              Mark as Active
            </button>
          )}
          {sale.status === "active" && (
            <button
              onClick={() => updateStatus(sale.id, "delivered")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-gray-900 dark:text-white">Loading sales...</div>;

  return (
    <div className="p-6 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Sales Orders</h1>

      {/* Pending Orders */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">🕓 Pending Orders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {grouped.pending.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No pending orders</p>
          ) : (
            grouped.pending.map(renderSale)
          )}
        </div>
      </section>

      {/* Active Orders */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">🚚 Active Orders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {grouped.active.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">No active orders</p>
          ) : (
            grouped.active.map(renderSale)
          )}
        </div>
      </section>

      {/* Delivered Orders Grouped by Date */}
      <section>
        <h2 className="text-xl font-semibold mb-4">✅ Delivered Orders</h2>
        {Object.keys(deliveredGroupedByDate).length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No delivered orders</p>
        ) : (
          Object.entries(deliveredGroupedByDate).map(([date, orders]) => (
            <div key={date} className="mb-8">
              <h3 className="text-lg font-bold underline mb-2 text-gray-900 dark:text-white">
                {date}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {orders.map(renderSale)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default SalesList;



// "use client";

// import React, { useEffect, useState } from 'react';

// type SaleStatus = "pending" | "active" | "delivered";

// type SaleItem = {
//   id: number;
//   product: {
//     name: string;
//   };
//   quantity: number;
//   price: number;
// };

// type Sale = {
//   id: number;
//   customerName: string;
//   address: string;
//   email: string;
//   phone: string;
//   status: SaleStatus;
//   items: SaleItem[];
// };

// const SalesList = () => {
//   const [sales, setSales] = useState<Sale[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSales = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/sales");
//       const data = await res.json();
//       setSales(data);
//     } catch (error) {
//       console.error("Failed to fetch sales:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id: number, status: SaleStatus) => {
//     try {
//       await fetch(`http://localhost:8000/api/sales/${id}/status`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status }),
//       });
//       fetchSales(); // Refresh the list
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   const grouped: Record<SaleStatus, Sale[]> = {
//     pending: [],
//     active: [],
//     delivered: [],
//   };

//   sales.forEach((sale) => {
//     grouped[sale.status].push(sale);
//   });

//   const renderSale = (sale: Sale) => {
//     const total = sale.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     return (
//       <div key={sale.id} className="border p-4 mb-4 rounded shadow bg-white">
//         <h3 className="text-lg font-bold">{sale.customerName}</h3>
//         <p><strong>Address:</strong> {sale.address}</p>
//         <p><strong>Email:</strong> {sale.email}</p>
//         <p><strong>Phone:</strong> {sale.phone}</p>

//         <div className="mt-2">
//           <h4 className="font-semibold underline">Products:</h4>
//           {sale.items.map((item) => (
//             <div key={item.id} className="ml-4">
//               <p>🛒 {item.product.name} - Qty: {item.quantity} - Price: ₦{item.price}</p>
//             </div>
//           ))}
//         </div>

//         <p className="mt-2 font-semibold">Total: ₦{total.toFixed(2)}</p>

//         {/* Buttons */}
//         <div className="mt-3">
//           {sale.status === 'pending' && (
//             <button
//               onClick={() => updateStatus(sale.id, 'active')}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
//             >
//               Mark as Active
//             </button>
//           )}
//           {sale.status === 'active' && (
//             <button
//               onClick={() => updateStatus(sale.id, 'delivered')}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
//             >
//               Mark as Delivered
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <div>Loading sales...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Sales Orders</h1>

//       {/* Pending Orders */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">🕓 Pending Orders</h2>
//         {grouped.pending.length === 0 ? <p>No pending orders</p> : grouped.pending.map(renderSale)}
//       </section>

//       {/* Active Orders */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">🚚 Active Orders</h2>
//         {grouped.active.length === 0 ? <p>No active orders</p> : grouped.active.map(renderSale)}
//       </section>

//       {/* Delivered Orders */}
//       <section>
//         <h2 className="text-xl font-semibold mb-4">✅ Delivered Orders</h2>
//         {grouped.delivered.length === 0 ? <p>No delivered orders</p> : grouped.delivered.map(renderSale)}
//       </section>
//     </div>
//   );
// };

// export default SalesList;
