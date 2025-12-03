/* eslint-disable @next/next/no-img-element */
import ProductImageMinuature from "@/components/product-image-miniature";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LovedItemProductProps {
    product: ProductType
}

const LovedItemProduct = (props: LovedItemProductProps) => {
    const { product } = props
    const router = useRouter()
    const { removeLovedItem } = useLovedProducts()
    const { addItem } = useCart()


    const addToCheckout = () => {
        addItem(product)
        removeLovedItem(product.id)
    }

    return (
        <li className="flex p-6 border-b">
            <ProductImageMinuature id={product.id} url={product.image1} />

            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{product.nombre}</h2>
                    <p className="font-bold">{formatPrice(product.precio)}</p>


                    <Button className="mt-5 rounded-full" onClick={addToCheckout}>Añadir al carrito</Button>
                </div>
                <div>
                    <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition")}>
                        <X size={20} onClick={() => removeLovedItem(product.id)} />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default LovedItemProduct;