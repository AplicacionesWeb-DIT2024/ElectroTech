"use client";
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from '@/hooks/use-toast'
import { useAuthStore } from "./useAuthStore";
import { ProductType } from "@/types/product"

interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType) => void
    removeItem: (id: number) => void
    removeAll: () => void
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType) => {
        const { user } = useAuthStore.getState();
        console.log(user);
        if (!user) {
          toast({
            title: "Debes iniciar sesión para agregar productos 🧑‍💻",
            variant: "destructive",
          });
          window.location.href = "/login?redirect=/";
          return;
        }
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        if (existingItem) {
            return toast({
                title: "El producto ya existe en el carrito.",
                variant: "destructive"
            })
        }

        set({
            items: [...get().items, data]
        })
        toast({
            title: "Producto añadido al carrito 🛍️"
        })
    },
    removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] })
        toast({
            title: "Producto eliminado del carrito 🗑️"
        })
    },

    removeAll: () => set({ items: [] })
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))