"use client";

import {
  Menu,
  ShoppingCart,
  Heart,
  User,
  Star,
  CreditCard,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import ToggleTheme from "./toggle-theme";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ItemsMenuMobile = () => {
  const { user, logout } = useAuth();
  const cart = useCart();
  const { lovedItems } = useLovedProducts();

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Abrir menú"
        className="p-2 rounded-md hover:bg-accent"
      >
        <Menu />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-56 space-y-3"
      >
            {/* USUARIO */}
            {user ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Hola, {user.name}
                </p>
    
                <Link
                  href="/reviews"
                  className="flex items-center gap-2"
                >
                  <Star size={18} />
                  Productos sin valorar
                </Link>
    
                <Link
                  href="/mis-compras"
                  className="flex items-center gap-2"
                >
                  <CreditCard size={18} />
                  Mis compras
                </Link>
    
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full text-left text-red-600"
                >
                  <LogOut size={18} />
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2"
              >
                <User size={18} />
                Ingresar
              </Link>
            )}
    
            <hr />
        {/* ACCIONES PRINCIPALES */}
        <div className="space-y-2">
          <Link
            href="/cart"
            className="flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Carrito
            {cart.items.length > 0 && (
              <span className="ml-auto text-sm">
                {cart.items.length}
              </span>
            )}
          </Link>

          <Link
            href="/loved-products"
            className="flex items-center gap-2"
          >
            <Heart
              size={18}
              className={
                lovedItems.length > 0
                  ? "fill-black dark:fill-white"
                  : ""
              }
            />
            Favoritos
          </Link>
        </div>

        <hr />


        {/* TEMA */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Tema</span>
          <ToggleTheme />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;