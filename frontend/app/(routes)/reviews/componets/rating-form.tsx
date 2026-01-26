"use client";

import { useState } from "react";
import { useReviews } from "@/hooks/use-reviews";
import { Button } from "@/components/ui/button";

interface RatingDetail {
  id: number; // factura_detail_id
  producto: {
    id: number;
    nombre: string;
  };
}

interface RatingFormProps {
  detail: RatingDetail;
  onClose: () => void;
  onSuccess: () => void;
}

const RatingForm = ({ detail, onClose, onSuccess }: RatingFormProps) => {
  const { submitReview } = useReviews();

  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    try {
      await submitReview({
        factura_detail_id: detail.id,
        puntuacion: stars,
        comentario: comment,
      });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error al enviar valoración");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-md w-full space-y-4">
        <h2 className="text-xl font-semibold">
          Valorando: {detail.producto.nombre}
        </h2>

        {/* Estrellas simples */}
        <div className="flex gap-2 text-2xl">
          {[1,2,3,4,5].map(num => (
            <span
              key={num}
              className={`cursor-pointer ${stars >= num ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => setStars(num)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comentario */}
        <textarea
          className="w-full border p-2 rounded-lg"
          rows={3}
          placeholder="¿Qué te pareció el producto?"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button onClick={send} disabled={loading}>
            {loading ? "Enviando..." : "Enviar valoración"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;