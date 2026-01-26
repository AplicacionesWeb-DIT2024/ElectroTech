import ProductCard from "./product-card";
import SkeletonSchema from "@/components/skeleton-schema";
import SmartPagination from "./smart-pagination";
import { useSearchProducts } from "@/hooks/useSearchProducts";
import { ProductType } from "@/types/product";
import { useState } from "react";

type Props = {
  query: string;
  brand?: string| null;
  category?: number| null;
  priceRange?: [number, number] | null;
};

const SearchProductsList = ({ query, brand, category,priceRange }: Props) => {
  const [page, setPage] = useState(1);

  const { result, loading } = useSearchProducts({
    q: query,
    brand,
    category,
    priceMin: priceRange?.[0],
    priceMax: priceRange?.[1],
    page,
  });

  if (loading) return <SkeletonSchema grid={3} />;

  if (!result || result.data.length === 0)
    return <p>No se encontraron productos.</p>;

  return (
    <div>
      <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
        {result.data.map((p: ProductType) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <SmartPagination
        page={page}
        totalPages={result.last_page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SearchProductsList;