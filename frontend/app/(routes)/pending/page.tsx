import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PendingPage() {
  return (
    <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
      <div className="flex flex-col-reverse gap-6 sm:flex-row">
        {/* Imagen */}
        <div className="flex justify-center md:min-w-[400px]">
          <Image
            src="/pending.webp"
            alt="Pago pendiente"
            width={350}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Contenido */}
        <div>
          <h1 className="text-3xl font-semibold text-yellow-600">
            Tu pago está siendo procesado
          </h1>

          <p className="my-3">
            Recibimos tu pedido correctamente, pero el pago todavía se encuentra
            en proceso de confirmación.
          </p>

          <p className="my-3">
            Esto puede suceder si utilizaste un medio de pago que requiere
            validación adicional, como una transferencia o pago diferido.
          </p>

          <p className="my-3">
            No es necesario que realices ninguna acción por el momento.
            Cuando tu pago sea aceptado podras verlo en mis compras.
          </p>

          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/mis-compras">
                Ver estado de mis compras
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/">
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}