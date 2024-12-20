import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/ProductType";

type CartState = {
  cart: ProductType[]; // Corrigido para ser um array
  addToCart: (product: ProductType) => void; // Método para adicionar ao carrinho
  removeFromCart: (productId: string) => void; // Método para remover do carrinho
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [] as ProductType[],
      addToCart: (product) =>
        set((state) => {
          const productExists = state.cart.find((item) => item.id === product.id)
          if (productExists) {
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return { ...item, quantity: item.quantity ? item.quantity + 1 : 1 }
              }
              return item
            })
            return { cart: updatedCart }
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }),
        removeFromCart: (productId) =>
          set((state) => ({
            cart: state.cart
              .map((item) =>
                item.id === productId && item.quantity && item.quantity > 1
                  ? { ...item, quantity: item.quantity - 1 }
                  : item.id === productId
                  ? null
                  : item
              )
              .filter((item) => item !== null) as ProductType[],
          })),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: "cart",
      setCheckout: (checkout) => set({ onCheckout: checkout }),
    }),
    { name: "cart-storage" }
  )
);
