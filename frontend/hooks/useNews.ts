
import { useEffect, useState } from "react";
import { api } from "@/hooks/api";  // Importamos la instancia de axios

// Importamos el tipo News
export interface News {
  id: number;
  title: string;
  description: string;
}

// Hook para obtener las novedades
const useNews = () => {
  const [news, setNews] = useState<News[]>([]);  // Establecemos el tipo como un array de novedades
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get<News[]>("/api/news");  // Aseguramos que la respuesta es un array de News
        setNews(response.data);  // Guardamos las novedades en el estado
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al obtener las novedades");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);  // El hook se ejecuta solo una vez al montar el componente

  return { news, loading, error };
};

export default useNews;
