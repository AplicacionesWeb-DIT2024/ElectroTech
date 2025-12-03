"use client"

import { BaggageClaim, Heart, ShoppingCart, User, Star, CreditCard, LogOut } from "lucide-react";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const cart = useCart();
  const { lovedItems } = useLovedProducts();
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
      {/* LOGO */}
      <Link href="/" className="cursor-pointer">
        <h1 className="text-3xl">
          Electro<span className="font-bold">Tech</span>
        </h1>
      </Link>

      {/* MENU PRINCIPAL */}
      <div className="hidden sm:flex items-center justify-between">
        <MenuList />
      </div>

      {/* MENU MOBILE */}
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      {/* ICONOS Y USUARIO */}
      <div className="flex items-center justify-between gap-2 sm:gap-7">
        {/* CARRITO */}
        <Link href="/cart" className="relative">
          {cart.items.length === 0 ? (
            <ShoppingCart strokeWidth={1} className="cursor-pointer" />
          ) : (
            <div className="flex gap-1 items-center cursor-pointer">
              <BaggageClaim strokeWidth={1} />
              <span className="text-sm">{cart.items.length}</span>
            </div>
          )}
        </Link>

        {/* FAVORITOS */}
        <Link href="/loved-products">
          <Heart
            strokeWidth={1}
            className={`cursor-pointer ${lovedItems.length > 0 ? "fill-black dark:fill-white" : ""}`}
          />
        </Link>

        {/* USUARIO / DESPLEGABLE */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <User strokeWidth={1} />
                <span className="hidden sm:inline">Hola, {user.name}</span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/reviews" className="flex items-center gap-2">
                  <Star size={16} />
                  Productos sin valorar
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/mis-compras" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  Mis compras
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <LogOut size={16} />
                  Salir
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">Ingresar</Link>
        )}

        {/* TOGGLE THEME */}
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
