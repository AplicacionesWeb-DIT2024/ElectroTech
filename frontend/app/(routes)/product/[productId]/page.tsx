"use client"

import { useGetProductById } from "@/api/getProductById";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import { Separator } from "@/components/ui/separator";
import ProductReviews from "./components/product-reviews";
import { Card, CardContent, CardFooter  } from "@/components/ui/card";



export default function Page() {
    const params = useParams()
    const { productId } = params;

    const { result }: ResponseType = useGetProductById(productId)
    if (result === null) {
        return <SkeletonProduct />
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:pl-12 sm:pr-12 lg:min-h-[80vh]">
            
            <div className="grid sm:grid-cols-2">
                <div>
                    <CarouselProduct images={result.images} />
                </div>

                <div className="sm:px-12">
                    <InfoProduct product={result}/>
                </div>
            </div>
             <div className="mt-16 sm:mt-16 px-2 sm:px-4">
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <Separator />
                <p className="whitespace-pre-line text-base leading-relaxed p-4">
                    {result.descripcion}
                </p>
            </div>
            <ProductReviews 
                reviews={result.valoraciones ?? []}
                avg={Number(result.average_rating) ?? 0}
            />
        </div>
    )
}