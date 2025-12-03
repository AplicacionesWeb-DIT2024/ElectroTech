import SkeletonSchema from "@/components/skeleton-schema";
import ProductCard from "./product-card";
import { ResponseType } from "@/types/response";
import { ProductType } from "@/types/product";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { useState } from "react";
import SmartPagination from "./smart-pagination";

type ProductsListProps = {
    categorySlug: string|string[];
    filters: { brand?: string; priceMin?: number; priceMax?: number };
};

const ProductsList = ({ categorySlug, filters }: ProductsListProps) => {
    const [page, setPage] = useState(1);
    const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug, filters,page)
    const productos = result?.data ?? [];
    const totalPages = result?.last_page ?? 1;

    if (loading) return (
        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
        <SkeletonSchema grid={3} />
        </div>
    );

    if (!result || productos.length === 0)
        return <p>No hay productos con este filtro.</p>;

    return (
        <div>
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
            {productos.map((product:ProductType) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
            <SmartPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            />
        </div>
    );
};

export default ProductsList;