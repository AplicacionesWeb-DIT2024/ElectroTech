 /* eslint-disable @next/next/no-img-element */
"use client";
import { useGetCategories } from "@/api/getCategories";
import Link from "next/link";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import Image from "next/image";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-16">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8 font-semibold">
        Elige tu categoría favorita
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          result !== null &&
          result.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative w-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              draggable={false}
            >
              {/* Imagen optimizada */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={category.image}
                  alt={category.nombre}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />

                {/* Overlay oscuro sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent" />

                {/* Texto centrado */}
                <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-lg font-semibold text-white tracking-wide backdrop-blur-sm bg-black/30 px-4 py-1 rounded-lg">
                  {category.nombre}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChooseCategory;