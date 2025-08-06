"use client";

import { useState } from "react";
import { useGetProductsQuery } from "../../app/state/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/cart/cartSlice";
import CartSidebar from "../../components/cartSidebar";
import NavbarNew from "@/components/navbarNew";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-screen">
      <NavbarNew />
      <div className="flex p-6">
        {/* LEFT: Products */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">All Products</h1>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {isLoading && <p>Loading products...</p>}
          {error && <p>Failed to load products.</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => {
              const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(product.name)}/150`;

              return (
                <div key={product.productId} className="border p-4 rounded shadow-sm">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
            {filteredProducts?.length === 0 && (
              <p>No products match your search.</p>
            )}
          </div>
        </div>

        {/* RIGHT: Cart */}
        <div className="w-[380px] border-l pl-6 hidden lg:block">
          <CartSidebar />
        </div>
      </div>
    </div>
  );
}
