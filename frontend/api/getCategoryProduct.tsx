import { useEffect, useState } from "react"

/* export function useGetCategoryProduct(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categorias/${slug}/productos`
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json)
                setLoading(false)
            } catch (error: any) {
                setError(error)
                setLoading(false)
            }
        })()
    }, [url])

    return { loading, result, error }
} */

export const useGetCategoryProduct = (
  categorySlug: string| string[],
  filters?: { brand?: string; priceMin?: number; priceMax?: number },
  page: number = 1
) => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (filters?.brand) params.append("marca", filters.brand);
        if (filters?.priceMin) params.append("precio_min", filters.priceMin.toString());
        if (filters?.priceMax) params.append("precio_max", filters.priceMax.toString());
        params.append("page", page.toString());

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categorias/${categorySlug}/productos?${params.toString()}`
        );
        const data = await res.json();
        setResult(data);
      } catch (error: any) {
        console.error(error);
        setError(error)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, filters, page]);

  return { result, loading, error };
};