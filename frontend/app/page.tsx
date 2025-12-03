"use client"
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeaturedProducts />
      <ChooseCategory />
    </main>
  );
}
