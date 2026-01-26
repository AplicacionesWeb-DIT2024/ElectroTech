import {api} from "@/hooks/api";
import { useCart } from "@/hooks/use-cart";

export const useCheckout = () => {
  const { items, removeAll  } = useCart();

  const startCheckout = async () => {
    try {
      const { data } = await api.post("/api/checkout", {
        items: items.map(item => ({
          title: item.nombre,
          quantity: 1,
          price: item.precio,
        })),
      });
      removeAll();
      // Redirige al Checkout Pro
      window.location.href = data.init_point;
    } catch (error) {
      console.error("Error creando preferencia de pago:", error);
      alert("Error al iniciar el pago, intenta nuevamente.");
    }
  };

  return { startCheckout };
};
