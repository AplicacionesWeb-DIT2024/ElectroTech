import { useEffect, useState } from "react";
import { api } from "@/hooks/api";

type Params = {
  q: string;
  brand?: string| null;
  category?: number| null;
  priceMin?: number;
  priceMax?: number;
  page: number;
};

export const useSearchProducts = (params: Params) => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);

  const cleanParams = {
    ...params,
    priceMin: Number.isFinite(params.priceMin) ? params.priceMin : undefined,
    priceMax: Number.isFinite(params.priceMax) ? params.priceMax : undefined,
  };

  api
    .get("/api/search/products", { params: cleanParams })
    .then(res => setResult(res.data))
    .finally(() => setLoading(false));

}, [JSON.stringify(params)]);

  return { result, loading };
};