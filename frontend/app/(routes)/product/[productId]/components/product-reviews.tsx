import { Card, CardContent } from "@/components/ui/card";

interface Review {
  id: number;
  puntuacion: number;
  comentario: string;
  created_at: string;
  user?: { name: string };
}
interface ProductReviewsProps {
  reviews: Review[];
  avg: number;
}

export default function ProductReviews({ reviews, avg }: ProductReviewsProps) {
  return (
    <div className="mt-16 px-2 sm:px-4">
      <h2 className="text-2xl font-semibold mb-4">Valoraciones</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">Este producto aún no tiene valoraciones.</p>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl text-yellow-500">
              {"★".repeat(Math.round(avg))}
            </span>
            <span className="text-lg text-gray-700">
              {avg.toFixed(1)} / 5
            </span>
            <span className="text-gray-500 text-sm">
              ({reviews.length} valoraciones)
            </span>
          </div>

          <div className="space-y-4">
            {reviews.map((rev: Review) => {
              const date = new Date(rev.created_at);
              const formattedDate = date.toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <Card key={rev.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-yellow-500">
                        {"★".repeat(rev.puntuacion)}
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm text-gray-600">
                          {rev.user?.name
                            ? rev.user.name[0] + "*".repeat(rev.user.name.length - 1)
                            : "Usuario"}
                        </p>
                        <p className="text-xs text-gray-400">{formattedDate}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-800">{rev.comentario}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
