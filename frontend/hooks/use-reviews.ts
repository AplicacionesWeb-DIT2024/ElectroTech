import { api } from "@/hooks/api";

export const useReviews = () => {

  const getPendingReviews = async () => {
    const { data } = await api.get("/api/reviews/pending");
    return data;
  };

  const submitReview = async (review: {
    factura_detail_id: number;
    puntuacion: number;
    comentario?: string;
  }) => {
    const { data } = await api.post("/api/reviews", review);
    return data;
  };

  return {
    getPendingReviews,
    submitReview
  };
};