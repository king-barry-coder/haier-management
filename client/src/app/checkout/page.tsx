"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { clearCart } from "../cart/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Particles from "../../components/ui/particles";

export default function CheckoutForm() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customerName,
      phone: phoneNumber,
      email,
      address,
      products: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await fetch("http://localhost:8000/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to submit order");

      setShowSuccess(true);
      setShowError(false);

      setCustomerName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      dispatch(clearCart());

      setTimeout(() => {
        setShowSuccess(false);
        router.push("/order");
      }, 3000);
    } catch (error) {
      console.error("Order submission error:", error);
      setShowError(true);
      setShowSuccess(false);

      setCustomerName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");

      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Checkout Form */}
      <div className="max-w-md mx-auto mt-[60px] px-4">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Checkout</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 dark:bg-black p-6 rounded-md shadow-md border-1 border-gray-500"
        >
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Submit Order
          </button>
        </form>

        {/* Success Popup */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-green-100 dark:bg-green-800 dark:text-green-100 text-green-800 p-4 rounded shadow text-center">
              ✅ Your order has been placed successfully!
            </div>
          </div>
        )}

        {/* Error Popup */}
        {showError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-red-100 dark:bg-red-800 dark:text-red-100 text-red-800 p-4 rounded shadow text-center">
              ❌ Failed to process order. Please try again later.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
