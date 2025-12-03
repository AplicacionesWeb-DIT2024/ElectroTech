/* "use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login, user, loading, error } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);

    // Si el login fue exitoso, redirigimos
    if (!loading && !error) {
      router.push("/"); // o "/productos" si querés llevar al listado
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Card className="w-[350px] shadow-lg border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Iniciar sesión
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          ¿No tenés cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Registrate
          </a>
        </CardFooter>
      </Card>
    </div>
  );
} */
"use client";


import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { login, user, loading, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && !loading) router.push(redirect);
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center">
      <Card className="w-[350px] shadow-lg border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Iniciar sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Ingresar"}
            </Button>
          </form>
           
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
            ¿No tenés cuenta?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Registrarse
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}