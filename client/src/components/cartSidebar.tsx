"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/state/store";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../app/cart/cartSlice";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.productId}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ${(item.price * 1500).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() =>
                      dispatch(decrementQuantity(item.productId))
                    }
                    className="px-2 py-1 bg-gray-200 rounded dark:bg-red-500"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(incrementQuantity(item.productId))
                    }
                    className="px-2 py-1 bg-gray-200 rounded dark:bg-green-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 font-semibold">
        Total: ${(total * 1500).toFixed(2)}
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={() => router.push("/checkout")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Checkout
        </button>
      )}
    </div>
  );
}



// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../app/state/store";
// import {
//   incrementQuantity,
//   decrementQuantity,
//   removeFromCart,
//   clearCart,
// } from "../app/cart/cartSlice";
// import { useState } from "react";

// export default function CartSidebar() {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();
//   const [showCheckoutForm, setShowCheckoutForm] = useState(false);
//   const [orderSubmitted, setOrderSubmitted] = useState(false);
//   const [submissionError, setSubmissionError] = useState(false);

//   const [customerName, setCustomerName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState(""); // ✅ added email field
//   const [address, setAddress] = useState("");

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleCheckoutSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const orderData = {
//       customerName,
//       phone: phoneNumber, // ✅ match backend field
//       email,
//       address,
//       products: cartItems.map((item) => ({
//         productId: item.productId,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//     };

//     try {
//       const res = await fetch("http://localhost:8000/api/sales", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (!res.ok) throw new Error("Failed to submit order");

//       setShowCheckoutForm(false);
//       setOrderSubmitted(true);
//       setSubmissionError(false); // clear error if previously shown

//       // Reset form
//       setCustomerName("");
//       setPhoneNumber("");
//       setEmail("");
//       setAddress("");

//       dispatch(clearCart()); // ✅ clear cart only on success

//       // Auto-hide success message
//       setTimeout(() => setOrderSubmitted(false), 5000);
//     } catch (error) {
//       console.error("Checkout error:", error);
//       setSubmissionError(true);
//       setTimeout(() => setSubmissionError(false), 5000);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Cart</h2>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Cart is empty.</p>
//       ) : (
//         <ul className="space-y-4">
//           {cartItems.map((item) => (
//             <li
//               key={item.productId}
//               className="border p-3 rounded flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-medium">{item.name}</p>
//                 <p className="text-sm text-gray-600">
//                   ${(item.price * 1500).toFixed(2)}
//                 </p>
//                 <div className="flex items-center space-x-2 mt-1">
//                   <button
//                     onClick={() =>
//                       dispatch(decrementQuantity(item.productId))
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded dark:bg-red-500"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       dispatch(incrementQuantity(item.productId))
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded dark:bg-green-500"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => dispatch(removeFromCart(item.productId))}
//                 className="text-red-600 text-sm"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       <div className="mt-4 font-semibold">
//         Total: ${(total * 1500).toFixed(2)}
//       </div>

//       {cartItems.length > 0 && !showCheckoutForm && !orderSubmitted && (
//         <button
//           onClick={() => setShowCheckoutForm(true)}
//           className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Checkout
//         </button>
//       )}

//       {showCheckoutForm && (
//         <form
//           onSubmit={handleCheckoutSubmit}
//           className="mt-6 space-y-4 bg-gray-50 p-4 rounded shadow"
//         >
//           <div>
//             <label className="block text-sm font-medium">Customer Name</label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Phone Number</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Address</label>
//             <textarea
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Submit Order
//           </button>
//         </form>
//       )}

//       {orderSubmitted && (
//         <div className="mt-4 p-4 bg-green-100 text-green-800 rounded shadow">
//           ✅ Your order has been submitted and is being processed...
//         </div>
//       )}

//       {submissionError && (
//         <div className="mt-4 p-4 bg-red-100 text-red-800 rounded shadow">
//           ❌ Failed to submit order. Please try again.
//         </div>
//       )}
//     </div>
//   );
// }
