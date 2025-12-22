/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeleton-schema";
import { ProductType } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";

const FeaturedProducts = () => {
  const { result, loading }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();
  const { addItem } = useCart();

/*   return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result !== null &&
            result.map((product: ProductType) => {
              const { id, nombre ,image1,marca, categoria} = product;
              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <img
                          src={`${image1}`}
                          alt="Image featured"
                        />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`product/${id}`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => addItem(product)}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{nombre}</h3>
                          <div className="flex items-center justify-between gap-3">
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                            {categoria.nombre}
                          </p>
                          <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                            {marca}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  ); */

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-16">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3}/> }

          {result !== null &&
            result.map((product: ProductType) => {
              const { id, nombre, image1, marca, categoria, images, precio } = product;
              const imageSrc = image1 || images?.[0];

              return (
                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                  <div className="p-1">
                    <Card className="border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                      
                      {/* HEADER: marca + categoría */}
                      <CardHeader className="flex justify-start p-3">
                        <CardDescription className="flex flex-row gap-2">

                        <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                          {marca}
                        </p>
                        <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
                          {categoria.nombre}
                        </p>
                        </CardDescription>
                      </CardHeader>

                      {/* CONTENT: imagen del producto */}
                      <CardContent className="relative w-full aspect-[5/4] p-0 overflow-hidden">
                        <Link href={`/product/${id}`} className="block relative w-full h-full bg-white">
                          <Image
                            src={imageSrc}
                            alt={nombre}
                            fill={true}
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            priority
                            className="object-contain transition duration-300 ease-in-out group-hover:scale-105 cursor-pointer"
                          />
                        </Link>

                        {/* Botones hover (visibles en mobile) */}
                        <div className="absolute w-full px-6 transition duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              href={`/product/${id}`}
                              icon={<Expand size={20} className="text-gray-600" />}
                            />
                            <IconButton
                              onClick={() => addItem(product)}
                              ariaLabel="Agregar producto al carrito"
                              icon={<ShoppingCart size={20} className="text-gray-600" />}
                            />
                          </div>
                        </div>
                      </CardContent>

                      {/* FOOTER: nombre + precio */}
                      <CardFooter className="flex flex-col items-center justify-center gap-1 py-4 text-center">
                        <Link href={`/product/${id}`}>
                          <p className="text-lg font-semibold hover:underline">
                            {nombre}
                          </p>
                        <p className="font-medium">
                          {formatPrice(precio)}
                        </p>
                        </Link>
                      </CardFooter>

                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;