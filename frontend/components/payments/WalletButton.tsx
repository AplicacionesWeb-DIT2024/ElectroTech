"use client";

import { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useCart } from "@/hooks/use-cart";
import { api } from "@/hooks/api";

export default function WalletButton() {
  const { items, removeAll } = useCart();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
  }, []);

  const handleSubmit = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Preparar datos
        const body = {
          items: items.map((item) => ({
            id: item.id,
            title: item.nombre,
            quantity: 1,
            price: Number(item.precio),
          })),
          purpose: "wallet_purchase",
        };

        // Crear preferencia en tu backend
        const res = await api.post("/api/checkout", body);

        // Borrar carrito
        removeAll();

        // Resolver al Wallet Brick con el id
        resolve(res.data.id); // ← MUY IMPORTANTE
      } catch (error) {
        console.error("Error creando preferencia", error);
        reject(error);
      }
    });
  };

  return (
    <Wallet
      initialization={{}}
      onSubmit={handleSubmit}
    />
  );
}