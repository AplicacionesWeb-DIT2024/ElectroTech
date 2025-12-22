"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import SearchFilters from "./components/search-filters";
import SearchProductsList from "./components/search-products-list";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const [filtersOpen, setFiltersOpen] = useState(false);

  const openFilters = () => setFiltersOpen(true);
  const closeFilters = () => setFiltersOpen(false);

  const { result: filters, loading } = useSearchFilters(q);

  const [brand, setBrand] = useState<string| null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const [resetKey, setResetKey] = useState(0);
  const clearFilters = () => {
    setResetKey(prev => prev + 1);
    };

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-12 sm:px-12">
      <h1 className="text-3xl font-medium">Resultados para “{q}”</h1>
      <Separator />

        <div className="flex justify-between items-center mb-4 sm:hidden">
            <p className="font-medium text-lg">Filtros</p>
            <Button className="m-3" onClick={openFilters}>Abrir filtros</Button>
        </div>
        <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
            <DialogContent className="w-80 p-6 sm:hidden">

                <SearchFilters
                brands={filters?.brands ?? []}
                categories={filters?.categories ?? []}
                onBrandChange={setBrand}
                onCategoryChange={setCategory}
                onPriceChange={setPriceRange}
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

        {!loading && filters && (
            <div className="hidden sm:block sm:w-[250px] flex-shrink-0">
            <SearchFilters
            brands={filters.brands}
            categories={filters.categories}
            onBrandChange={setBrand}
            onCategoryChange={setCategory}
            onPriceChange={setPriceRange}
            onClear={clearFilters}
            resetKey={resetKey}
            />
            </div>
        )}
            
          <SearchProductsList
            query={q}
            brand={brand}
            category={category}
            priceRange={priceRange}
          />
      </div>
    </div>
  );
}
