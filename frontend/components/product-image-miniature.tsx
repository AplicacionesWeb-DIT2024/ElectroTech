/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

interface ProductImageMiniatureProps {
  id: number;
  url: string;
}

const ProductImageMinuature = (props: ProductImageMiniatureProps) => {
  const { id, url } = props;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className="cursor-pointer"
    >
      <img
        src={`${url}`}
        alt="Product"
        className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
      />
    </div>
  );
};

export default ProductImageMinuature;