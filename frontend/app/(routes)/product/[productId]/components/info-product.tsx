import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = ({ product }: InfoProductProps) => {
  const { addItem } = useCart();
  const { addLoveItem } = useLovedProducts();
  const router = useRouter();

  return (
    <div className="px-6 space-y-4">
      {/* Nombre y Marca */}
      <div>
        <h1 className="text-2xl font-semibold">{product.nombre}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Marca: <span className="font-medium text-foreground">{product.marca}</span>
        </p>
      </div>

    
      <Separator />

      {/* Detalles */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          <span className="font-medium text-foreground">Garantía:</span>{" "}
          {product.garantia || "Sin garantía"} meses
        </p>
        <p>
          <span className="font-medium text-foreground">Stock:</span>{" "}
          {product.stock > 0 ? (
            <span className="text-green-600 font-medium">{product.stock} disponibles</span>
          ) : (
            <span className="text-red-500 font-medium">Sin stock</span>
          )}
        </p>
      </div>

      <Separator />

      {/* Precio y acciones */}
      <div>
        <p className="text-3xl font-semibold mb-4">{formatPrice(product.precio)}</p>
        <div className="flex items-center gap-4">
          
          <Button
            className="w-full"
            onClick={() => {
              addItem(product);
              router.push("/cart");
            }}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Comprar" : "Sin stock"}
          </Button>
          <Heart
            width={28}
            strokeWidth={1.2}
            className="cursor-pointer transition hover:fill-black"
            onClick={() => addLoveItem(product)}
          />
        </div>
      </div>
    </div>
  );
};
export default InfoProduct;