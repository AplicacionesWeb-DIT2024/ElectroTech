import { api } from "@/hooks/api";

export const usePurchases = () => {

  const getPurchases = async () => {
    const { data } = await api.get("/api/compras");
    return data;
  };

  return {
    getPurchases
  };
};