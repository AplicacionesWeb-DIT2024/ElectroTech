/* eslint-disable @next/next/no-img-element */
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";

import IconButton from "@/components/icon-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter, CardDescription } from "@/components/ui/card";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addItem } = useCart();


  return (
    <div className="border border-gray-200 relative p-2 transition-all duration-150 rounded-lg shadow-md sm:shadow-none sm:hover:shadow-md bg-white dark:bg-neutral-900">

      {/* BADGES */}
      <div className="absolute flex items-center gap-3 px-2 z-[1] top-4 left-4">
        <span className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black">
          {product.marca}
        </span>
      </div>

      {/* CARRUSEL */}
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index} className="group relative bg-white">
              {/* Imagen envuelta en Link */}
              <Link href={`/product/${product.id}`}>
                <img
                  src={image}
                  alt={product.nombre}
                  className="aspect-[5/4] w-full object-contain rounded-xl cursor-pointer"
                />
              </Link>

              {/* Botones — no envueltos en Link */}
              <div className="absolute w-full px-6 transition duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 bottom-2">
                <div className="flex justify-center gap-x-6 pointer-events-auto">
                  <IconButton
                    href={`/product/${product.id}`} // IconButton puede renderizar Link internamente
                    icon={<Expand size={20} className="text-gray-600" />}
                  />
                  <IconButton
                    onClick={() => addItem(product)}
                    icon={<ShoppingCart size={20} className="text-gray-600" />}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* INFO — envuelto en Link */}
      <Link href={`/product/${product.id}`} className="block mt-2 text-center">
        <p className="text-xl hover:underline">{product.nombre}</p>
        <p className="font-bold">{formatPrice(product.precio)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;