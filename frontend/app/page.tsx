"use client"
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import BannerProduct from "@/components/banner-product";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeaturedProducts />
      <BannerProduct />
      <ChooseCategory />
    </main>
  );
}
