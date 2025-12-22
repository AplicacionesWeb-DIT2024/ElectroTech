"use client"

import { BaggageClaim, Heart, ShoppingCart, User, Star, CreditCard, LogOut } from "lucide-react";
import SearchForm from "./search-form";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import Link from "next/link";
import Image from "next/image";
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
    <div id="navbar" className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl lg:max-w-7xl">
      {/* LOGO */}
      <Link href="/" aria-label="Ir a la página principal">
        {/* Logo mobile */}
        <div className="sm:hidden">
          <Image
            src="/icon512_rounded.png"
            alt="ElectroTech"
            width={40}
            height={40}
            priority
          />
        </div>

        {/* Logo desktop */}
        <h1 className="hidden sm:block text-3xl">
          Electro<span className="font-bold">Tech</span>
        </h1>
      </Link>

      {/* MENU PRINCIPAL */}
      <div className="flex flex-1 justify-center px-2 sm:px-6">
        <SearchForm />
      </div>

      {/* MENU MOBILE */}
      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      {/* ICONOS Y USUARIO */}
      <div className="hidden sm:flex items-center justify-between gap-7">
        {/* CARRITO */}
        <Link href="/cart" className="relative" aria-label="Ir al carrito de compras">
          {user && cart.items.length > 0 ? (
            <div className="flex gap-1 items-center cursor-pointer">
              <BaggageClaim strokeWidth={1} />
              <span className="text-sm">{cart.items.length}</span>
            </div>
          ) : (
            <ShoppingCart strokeWidth={1} className="cursor-pointer" />
          )}
        </Link>

        {/* FAVORITOS */}
        <Link href="/loved-products" aria-label="Ir a los productos que me gustan">
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
