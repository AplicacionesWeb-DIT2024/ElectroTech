import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FailurePage() {
  return (
    <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
      <div className="flex flex-col-reverse gap-6 sm:flex-row">
        {/* Imagen */}
        <div className="flex justify-center md:min-w-[400px]">
          <Image
            src="/failure.webp"
            alt="Pago rechazado"
            width={350}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Contenido */}
        <div>
          <h1 className="text-3xl font-semibold text-red-600">
            No pudimos procesar tu pago
          </h1>

          <p className="my-3">
            Lamentablemente el pago no pudo completarse.
            No se realizó ningún cobro.
          </p>

          <p className="my-3">
            Esto puede deberse a un problema con el medio de pago,
            falta de fondos o una validación rechazada.
          </p>

          <p className="my-3">
            Te recomendamos intentar nuevamente o utilizar otro medio de pago.
          </p>

          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/cart">
                Volver al carrito
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/">
                Seguir comprando
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}