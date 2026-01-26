import { useEffect, useState } from "react";
import { api } from "@/hooks/api";

type Category = {
  id: number;
  nombre: string;
};


type SearchFiltersResponse = {
  brands: string[];
  categories: Category[];
  price_min: number;
  price_max: number;
};

export const useSearchFilters = (query: string) => {
  const [result, setResult] = useState<SearchFiltersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    api
      .get("/api/search/filters", { params: { q: query } })
      .then(res => setResult(res.data))
      .finally(() => setLoading(false));
  }, [query]);

  return { result, loading };
};