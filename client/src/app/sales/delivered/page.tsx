"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

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
  email: string;
  phone: string;
  address: string;
  status: "pending" | "active" | "delivered" | "cancelled";
  items: SaleItem[];
  createdAt: string;
}

export default function DeliveredPage() {
  const [deliveredGroupedByDate, setDeliveredGroupedByDate] = useState<
    Record<string, Sale[]>
  >({});

  // Fetch delivered sales
  const fetchDeliveredSales = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sales`
      );
      const data: Sale[] = await res.json();

      const delivered = data.filter((s) => s.status === "delivered");

      // Group by date
      const grouped: Record<string, Sale[]> = {};
      delivered.forEach((s) => {
        const date = dayjs(s.createdAt).format("MMMM D, YYYY");
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(s);
      });

      setDeliveredGroupedByDate(grouped);
    } catch (err) {
      console.error("Error fetching delivered sales:", err);
    }
  };

  useEffect(() => {
    fetchDeliveredSales();
    const interval = setInterval(fetchDeliveredSales, 10000);
    return () => clearInterval(interval);
  }, []);

  // Render Sale Card
  const renderSale = (sale: Sale) => {
    const total = sale.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <div
        key={sale.id}
        className="border p-4 rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {sale.customerName}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>📞</strong> {sale.email}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>📧</strong> {sale.phone}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Address:</strong> {sale.address}
        </p>

        <div className="mt-3">
          <h4 className="font-semibold underline text-gray-900 dark:text-white">
            Products:
          </h4>
          {sale.items.map((item) => (
            <div
              key={item.id}
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              🛒 {item.product.name} - Qty: {item.quantity} - Price: $
              {item.price}
            </div>
          ))}
        </div>

        <p className="mt-2 font-semibold text-gray-900 dark:text-white">
          Total: ${total.toFixed(2)}
        </p>

        <p className="mt-3 inline-block px-4 py-2 rounded text-white bg-green-500">
          Status: DELIVERED
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Delivered Orders</h1>

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
    </div>
  );
}
