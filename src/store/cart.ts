import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  flavor?: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (product: Product, qty?: number, flavor?: string) => void;
  remove: (productId: string, flavor?: string) => void;
  setQty: (productId: string, quantity: number, flavor?: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

function keyOf(id: string, flavor?: string) {
  return flavor ? `${id}::${flavor}` : id;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (product, qty = 1, flavor) => {
        set((s) => {
          const k = keyOf(product.id, flavor);
          const existing = s.items.find(
            (i) => keyOf(i.productId, i.flavor) === k,
          );
          if (existing) {
            return {
              items: s.items.map((i) =>
                keyOf(i.productId, i.flavor) === k
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...s.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: qty,
                flavor,
              },
            ],
            isOpen: true,
          };
        });
      },
      remove: (productId, flavor) => {
        const k = keyOf(productId, flavor);
        set((s) => ({
          items: s.items.filter((i) => keyOf(i.productId, i.flavor) !== k),
        }));
      },
      setQty: (productId, quantity, flavor) => {
        const k = keyOf(productId, flavor);
        if (quantity <= 0) {
          get().remove(productId, flavor);
          return;
        }
        set((s) => ({
          items: s.items.map((i) =>
            keyOf(i.productId, i.flavor) === k ? { ...i, quantity } : i,
          ),
        }));
      },
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((n, i) => n + i.price * i.quantity, 0),
    }),
    { name: "enve-fuel-cart" },
  ),
);
