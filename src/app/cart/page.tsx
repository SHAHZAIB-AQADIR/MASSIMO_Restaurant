"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, changeQuantity } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const serviceCost = 0; 
  const deliveryCost = subtotal > 50 ? 0 : 5; 
  const total = subtotal + serviceCost + deliveryCost;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: number, delta: number) => {
    changeQuantity(id, delta);
  };

  if (!isHydrated) {
    return (
      <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 items-center justify-center">
          <h1 className="text-2xl font-bold mb-4 italic uppercase">Loading Massimo Cart...</h1>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 items-center justify-center text-center px-4">
          <h1 className="text-2xl font-black mb-4 uppercase italic">Your cart is empty</h1>
          <p className="mb-6">Add some delicious items to get started!</p>
          <Link href="/menu" className="bg-red-500 text-white px-8 py-3 rounded-md font-bold hover:bg-black transition">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
            <Image src={item.img} alt={item.title} width={80} height={80} className="object-contain" />
            <div className="flex-1 px-4">
              <h1 className="uppercase text-lg font-black italic leading-tight">{item.title}</h1>
              <span className="text-xs text-gray-500">{item.options?.[0]?.title || "Regular"}</span>
              <div className="flex items-center gap-3 mt-2">
                <button 
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="font-bold text-sm">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <h2 className="font-black text-lg">${(item.price * item.quantity).toFixed(2)}</h2>
              <button 
                onClick={() => handleRemoveItem(item.id)}
                className="text-[10px] uppercase font-bold text-gray-400 hover:text-red-700 underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="font-bold">${serviceCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className={deliveryCost === 0 ? "text-green-600 font-bold" : "font-bold"}>
            {deliveryCost === 0 ? "FREE!" : `$${deliveryCost.toFixed(2)}`}
          </span>
        </div>
        <hr className="my-2 border-red-200" />
        <div className="flex justify-between text-xl">
          <span className="font-black italic">TOTAL</span>
          <span className="font-black">${total.toFixed(2)}</span>
        </div>

        {/* ✅ SAHI LINK: /checkout (small letters) */}
        <Link href="/checkout" className="w-full flex justify-end">
          <button className="bg-red-500 text-white p-4 rounded-xl w-full md:w-1/2 font-black uppercase italic hover:bg-black transition-all shadow-lg">
            CHECKOUT
          </button>
        </Link> 
      </div>
    </div>
  );
};

export default CartPage;