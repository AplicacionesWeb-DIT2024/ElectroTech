"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "./components/cart-item";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCheckout } from "@/hooks/useCheckout";
import WalletButton from "@/components/payments/WalletButton";


export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const { startCheckout } = useCheckout();

  const { items, removeAll } = useCart();

  const prices = items.map((product) => product.precio);
  const totalPrice = prices.reduce((total, price) => total + price, 0);


    useEffect(() => {
        if (!loading && !user) {
          router.replace("/login?redirect=/cart");
        }
      }, [user, loading, router]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return null; // evita parpadeo mientras redirige

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[80vh]">
      <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-6 rounded-lg bg-slate-100">
            <p className="mb-3 text-black text-lg font-semibold">Resumen del pedido</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p className="text-black">Total</p>
              <p className="text-black">{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              {items.length > 0 && <WalletButton />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}