"use client";
export const dynamic = "force-dynamic"; // Vercel build error fix karne ke liye

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: string;
  customer: string;
  email?: string;
  products: string;
  price: string;
  status: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch {
        console.error("Fetch error");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-red-500">MASSIMO ADMIN...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-red-500 uppercase italic">Admin Dashboard</h1>
        <Link href="/">
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-black transition shadow-lg">
            HOME
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-red-500 text-white">
            <tr className="text-xs uppercase">
              <th className="p-4">Customer</th>
              <th className="p-4">Email</th>
              <th className="p-4">Items</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} className="p-10 text-center text-gray-400">No orders found.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-red-50">
                  <td className="p-4 font-bold">{order.customer}</td>
                  <td className="p-4 text-xs text-gray-500">{order.email || "N/A"}</td>
                  <td className="p-4 text-xs italic">{order.products}</td>
                  <td className="p-4 font-black text-red-600">${order.price}</td>
                  <td className="p-4 font-bold text-orange-500 uppercase text-[10px]">{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}