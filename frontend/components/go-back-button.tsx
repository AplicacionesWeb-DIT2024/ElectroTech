'use client';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button'; // Asegúrate de usar tu componente de botón

const GoBackButton = () => {
  const router = useRouter();
  
  // Verifica si la ruta es la del Home ('/')
  if (router.pathname === '/') {
    return null; // Si estamos en la página de inicio, no renderizamos el botón
  }

  const handleGoBack = () => {
    router.back(); // Navegar hacia atrás
  };

  return (
    <Button
      onClick={handleGoBack}
      className="fixed bottom-8 left-8 z-50 bg-blue-500 text-white p-3 rounded-full shadow-md"
    >
      ←
    </Button>
  );
};

export default GoBackButton;
