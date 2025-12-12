"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {api} from "@/hooks/api"; 
import Link from "next/link";

export default function PageSuccessClient() {
    const router = useRouter()

    const params = useSearchParams();

    useEffect(() => {
        const paymentId = params.get("payment_id");
        if (!paymentId) return;

        api.post("/api/payment/confirm", {
            payment_id: paymentId,
        })
            .then(res => {
                console.log("Pago confirmado:", res.data);
            })
            .catch(err => {
                console.error("Error al confirmar pago:", err);
            });
    }, [params]);

    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <div className="flex justify-center md:min-w-[400px]">
                    <Image src="/success.jpg" alt="Success" width={350} height={500} className="rounded-lg" />
                </div>

                <div>
                    <h1 className="text-3xl font-semibold">¡Gracias por confiar en nosotros!</h1>
                    <p className="my-3">
                    Tu pedido fue procesado exitosamente y ya se encuentra en nuestro sistema.
                    </p>

                    <p className="my-3">
                    Nuestro equipo está preparando tu producto para que lo recibas en perfectas condiciones,
                    listo para que empieces a disfrutar de la mejor tecnología.
                    </p>

                    <p className="my-3">
                    Te mantendremos informado sobre el estado de tu compra y el envío.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <Button asChild>
                            <Link href="/mis-compras">
                            Ver mis compras
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
