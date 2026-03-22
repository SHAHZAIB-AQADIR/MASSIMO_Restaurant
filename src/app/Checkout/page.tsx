"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => setIsHydrated(true), []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = (subtotal + 2.0 + (subtotal > 50 ? 0 : 5.0)).toFixed(2);

  const handleConfirmOrder = async () => {
    if (!name || !email) {
      alert("Please enter Name and Email!");
      return;
    }

    setLoading(true);
    const orderData = {
      customer: name,
      email: email,
      products: cartItems.map(i => `${i.title} (x${i.quantity})`).join(", "),
      price: total,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        if (clearCart) clearCart();
        // ✅ Path small letters mein:
        router.push("/order-success");
      }
    } catch {
      alert("Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) return <div className="p-20 text-center font-bold text-red-500 uppercase italic">Loading Massimo...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-black mb-8 text-red-500 uppercase italic tracking-tighter">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <input 
            type="text" placeholder="Full Name" 
            className="w-full border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" placeholder="Email Address" 
            className="w-full border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mt-6 space-y-4 max-h-60 overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-2">
                <div className="relative w-12 h-12 shrink-0">
                  <Image src={item.img} alt={item.title} fill className="object-cover rounded shadow-sm" sizes="48px" />
                </div>
                <div className="flex-1 text-xs font-bold uppercase tracking-tight">{item.title} x{item.quantity}</div>
                <div className="font-black text-red-600">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-3xl shadow-xl border-t-8 border-red-500 h-fit">
          <div className="flex justify-between text-2xl font-black mb-6 text-red-600 italic">
            <span>TOTAL:</span><span>${total}</span>
          </div>
          <button 
            onClick={handleConfirmOrder}
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition-all disabled:bg-gray-400 uppercase tracking-widest shadow-lg"
          >
            {loading ? "SAVING..." : "CONFIRM ORDER"}
          </button>
        </div>
      </div>
    </div>
  );
}