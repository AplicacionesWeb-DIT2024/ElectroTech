/* eslint-disable @next/next/no-img-element */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CarouselProductProps {
  images: string[];
}

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;

  return (
    <div className="sm:px-16">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-lg overflow-hidden border border-gray-300 bg-white">
                <Image
                  src={image}
                  alt="Image product"
                  sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
                  fill
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;