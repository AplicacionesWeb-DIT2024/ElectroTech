"use client";

import { useEffect, useState } from "react";
import { useReviews } from "@/hooks/use-reviews";
import { Button } from "@/components/ui/button";
import RatingForm from "./componets/rating-form";
import Image from "next/image";
import Link from "next/link";
import { toast } from '@/hooks/use-toast';

// Tipo de cada valoración pendiente
interface PendingReview {
  id: number;
  cantidad: number;
  precio_unitario: number;
  created_at: string;
  producto: {
    id: number;
    nombre: string;
    image1: string;
    precio: number;
  };
}

const PendingReviewsPage = () => {
  const { getPendingReviews } = useReviews();

  const [items, setItems] = useState<PendingReview[]>([]);
  const [selected, setSelected] = useState<PendingReview | null>(null);

  useEffect(() => {
    getPendingReviews().then(setItems);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Productos por valorar</h1>

      {items.length === 0 ? (
        <p>No tenés valoraciones pendientes 🎉</p>
      ) : (
        <div className="space-y-4">
          {items.map((detail) => (
            <div
              key={detail.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card"
            >
              {/* Imagen y detalles */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src={detail.producto.image1}
                    alt={detail.producto.nombre}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <Link href={`/product/${detail.producto.id}`}>
                    <h2 className="text-lg font-medium text-foreground hover:underline">
                    {detail.producto.nombre}
                    </h2>
                </Link>
                  <p className="text-sm text-muted-foreground">
                    Fecha de compra: {new Date(detail.created_at).toLocaleDateString("es-AR")}
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground">Precio de compra: ${detail.precio_unitario}</p>
                </div>
              </div>

              {/* Botón de valorar */}
              <Button onClick={() => setSelected(detail)}>
                Valorar
              </Button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <RatingForm
          detail={selected}
          onClose={() => setSelected(null)}
          onSuccess={() => {
            setItems(items.filter(i => i.id !== selected.id));
            setSelected(null);
            toast({
              title: "Valoracion enviada 🧡"
            })
          }}
        />
      )}
    </div>
  );
};

export default PendingReviewsPage;