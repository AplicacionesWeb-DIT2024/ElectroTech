"use client";
import { useState, useEffect } from "react";
import {api} from "@/hooks/api";
import { useAuthStore } from "./useAuthStore";

export function useAuth() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

/*   // Obtener usuario autenticado al montar el componente
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/user");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []); */

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/user");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Paso 1: obtener cookie CSRF
      await api.get("/sanctum/csrf-cookie");

      // Paso 2: enviar login
      const res = await api.post("/api/login", { email, password });
      setUser(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error de login");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    try {
      setLoading(true);
      setError(null);

      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/api/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      setUser(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.post("/api/logout");
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      setLoading(false);
    }
  };
  // Cargar usuario al montar
  useEffect(() => {
    getUser();
  }, []);

  return { user, login, logout,register, loading, error };
}
