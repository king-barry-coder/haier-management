import CartSidebar from '@/components/cartSidebar'
import React from 'react'

const CartPage = () => {
  return (
    <div className="flex p-6">
      {/* Cart Sidebar aligned left */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <CartSidebar />
      </div>
    </div>
  )
}

export default CartPage
