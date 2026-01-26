"use client";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls";
import { useState, useMemo } from "react";
import ProductsList from "./components/products-list";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default function Page() {
  const params = useParams();
  const { categorySlug } = params;
  const slug = Array.isArray(categorySlug) ? categorySlug[0] : categorySlug;

  const [filtersOpen, setFiltersOpen] = useState(false);

  const openFilters = () => setFiltersOpen(true);
  const closeFilters = () => setFiltersOpen(false);

  const [filterBrand, setFilterBrand] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const [resetKey, setResetKey] = useState(0);
  const clearFilters = () => {
    setResetKey(prev => prev + 1);
    };


  const filters = useMemo(
    () => ({
      brand: filterBrand || undefined,
      priceMin: priceRange ? priceRange[0] : undefined,
      priceMax: priceRange ? priceRange[1] : undefined,
    }),
    [filterBrand, priceRange]
  );



  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-12 sm:px-12">
      <h1 className="text-3xl font-medium">
        {slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
      </h1>
      <Separator />

        <div className="flex justify-between items-center mb-4 sm:hidden">
        <p className="font-medium text-lg">Filtros</p>
        <Button className="m-3" onClick={openFilters}>Abrir filtros</Button>
        </div>
        <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
            <DialogContent className="w-80 p-6 sm:hidden">

                <FiltersControlsCategory
                  setFilterBrand={setFilterBrand}
                  setPriceRange={setPriceRange}
                  slug={categorySlug}
                  onClear={clearFilters}
                  resetKey={resetKey}
                />

                <div className="mt-4 flex justify-end">
                <DialogClose asChild>
                    <Button>Aplicar filtros</Button>
                </DialogClose>
                </div>
            </DialogContent>
        </Dialog>

      <div className="sm:flex sm:justify-between">
        <div className="hidden sm:block sm:w-[250px] flex-shrink-0">

        <FiltersControlsCategory
          setFilterBrand={setFilterBrand}
          setPriceRange={setPriceRange}
          slug={categorySlug}
          onClear={clearFilters}
          resetKey={resetKey}
          />
          </div>
       
        <ProductsList categorySlug={categorySlug} filters={filters} />
      </div>
    </div>
  );
}