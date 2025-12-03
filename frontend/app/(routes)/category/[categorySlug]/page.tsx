"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams, useRouter } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls";
import SkeletonSchema from "@/components/skeleton-schema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState, useMemo } from "react";
import ProductsList from "./components/products-list";


export default function Page() {
  const params = useParams();
  const { categorySlug } = params;
  const slug = Array.isArray(categorySlug) ? categorySlug[0] : categorySlug;

  const [filterBrand, setFilterBrand] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const filters = useMemo(
    () => ({
      brand: filterBrand || undefined,
      priceMin: priceRange ? priceRange[0] : undefined,
      priceMax: priceRange ? priceRange[1] : undefined,
    }),
    [filterBrand, priceRange]
  );

  /* const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug); */
  /* const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug, filters); */

  /* const filteredProducts = result !== null && result.productos; */

  const router = useRouter();

/*   const filteredProducts =
    result !== null &&
    !loading &&
    (filterOrigin === ""
      ? result
      : result.filter(
          (product: ProductType) => product.nombre === filterOrigin
        )); */

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
        <h1 className="text-3xl font-medium">
          {slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
        </h1>
      <Separator />

      <div className="sm:flex sm:justify-between">
        
          <FiltersControlsCategory
            setFilterBrand={setFilterBrand}
            setPriceRange={setPriceRange}
            slug={categorySlug}
          />
       
{/*         <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}
          {filteredProducts !== null &&
            !loading &&
            filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          {filteredProducts !== null &&
            !loading &&
            filteredProducts.length === 0 && (
              <p>No hay productos con este filtro.</p>
            )}
        </div> */}
        <ProductsList categorySlug={categorySlug} filters={filters} />
      </div>
    </div>
  );
}