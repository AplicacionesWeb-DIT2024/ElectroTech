"use client";

import { useEffect, useRef, useState } from "react";

const BannerProduct = () => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;

        // Altura del navbar: ajusta según tu diseño
        const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;

        // Posición del banner respecto al inicio de la página
        const bannerTop = scrollTop + rect.top - navbarHeight;

        // Parallax suave
        const y = (scrollTop - bannerTop) * 0.50;
        setOffset(y);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[35vh] sm:h-[45vh] lg:h-[55vh] overflow-hidden"
    >
      {/* IMAGEN DE FONDO */}
      <div
    className="absolute -top-10 left-0 w-full h-[150%] bg-center bg-cover will-change-transform"
    style={{
      backgroundImage: "url('/banner.webp')",
      transform: `translateY(${offset}px)`,
    }}
  />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENIDO */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div>
          <h1 className="text-white text-4xl sm:text-5xl font-bold">
            ElectroTech
          </h1>
          <p className="text-white/90 mt-4">
            Tecnología para tu día a día
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;