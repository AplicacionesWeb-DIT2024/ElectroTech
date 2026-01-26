"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePurchases } from "@/hooks/use-purchases";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FacturaDetalle {
  id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  producto: {
    id: number;
    nombre: string;
    image1: string;
  };
}

interface Factura {
  id: number;
  created_at: string;
  precio_total: number;
  estado: string;
  detalles: FacturaDetalle[];
}

const MyPurchasesPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { getPurchases } = usePurchases();
  const [facturas, setFacturas] = useState<Factura[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/mis-compras");
    }
    getPurchases().then(setFacturas);
  }, [user, loading, router, setFacturas]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Mis compras</h1>

      {facturas.length === 0 ? (
        <p>No tenés compras registradas todavía.</p>
      ) : (
        <div className="space-y-6">
          {facturas.map((factura) => (
            <div
              key={factura.id}
              className="border rounded-lg p-4 bg-card shadow-sm"
            >
              {/* CABECERA */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-lg">
                    Compra #{factura.id}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(factura.created_at).toLocaleDateString("es-AR")}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-semibold mt-1 ${
                      factura.estado === "pagado"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                  </span>
                </div>
              </div>

              {/* PRODUCTOS */}
              <div className="mt-4 space-y-4">
                {factura.detalles.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-4 border rounded-md p-3 bg-background"
                  >
                    <div className="w-16 h-16 relative">
                      <Image
                        src={d.producto.image1}
                        alt={d.producto.nombre}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1">
                      <Link href={`/product/${d.producto.id}`}>
                        <h3 className="font-medium hover:underline">
                          {d.producto.nombre}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {d.cantidad}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Unitario: ${d.precio_unitario}
                      </p>
                      <p className="font-semibold">Subtotal: ${d.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-4 text-right">
                <p className="text-lg font-semibold">
                  Total: ${factura.precio_total}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchasesPage;
