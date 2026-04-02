import { useState, useCallback } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: "netflix" | "prime" | "hbo";
  duration: string;
}

export interface ComboPromo {
  id: string;
  name: string;
  productIds: string[];
  discountPercent: number;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "netflix",
    name: "Netflix",
    description: "Películas, series y documentales ilimitados en HD y 4K",
    price: 15000,
    icon: "netflix",
    duration: "1 mes",
  },
  {
    id: "prime",
    name: "Prime Video",
    description: "Series exclusivas, películas y envíos gratis con Amazon",
    price: 12000,
    icon: "prime",
    duration: "1 mes",
  },
  {
    id: "hbo",
    name: "HBO Max",
    description: "Los mejores originales de HBO, películas y series exclusivas",
    price: 14000,
    icon: "hbo",
    duration: "1 mes",
  },
];

export function useStore() {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return DEFAULT_PRODUCTS;
    const saved = localStorage.getItem("streaming-products");
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  const [combos, setCombos] = useState<ComboPromo[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("streaming-combos");
    return saved ? JSON.parse(saved) : [];
  });

  const updatePrice = useCallback((id: string, price: number) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, price } : p));
      localStorage.setItem("streaming-products", JSON.stringify(next));
      return next;
    });
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addCombo = useCallback((combo: Omit<ComboPromo, "id">) => {
    setCombos((prev) => {
      const next = [...prev, { ...combo, id: crypto.randomUUID() }];
      localStorage.setItem("streaming-combos", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeCombo = useCallback((id: string) => {
    setCombos((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem("streaming-combos", JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleCombo = useCallback((id: string) => {
    setCombos((prev) => {
      const next = prev.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      );
      localStorage.setItem("streaming-combos", JSON.stringify(next));
      return next;
    });
  }, []);

  const getCartTotal = useCallback(() => {
    let total = 0;
    const cartProductIds = cart.map((i) => i.product.id);

    // Check for active combos
    const activeCombo = combos.find(
      (c) =>
        c.active &&
        c.productIds.every((pid) => cartProductIds.includes(pid))
    );

    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    if (activeCombo) {
      total = total * (1 - activeCombo.discountPercent / 100);
    }

    return { total, combo: activeCombo || null };
  }, [cart, combos]);

  const addComboToCart = useCallback(
    (combo: ComboPromo) => {
      combo.productIds.forEach((pid) => {
        const product = products.find((p) => p.id === pid);
        if (product) {
          setCart((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (!existing) {
              return [...prev, { product, quantity: 1 }];
            }
            return prev;
          });
        }
      });
    },
    [products]
  );

  return {
    products,
    cart,
    combos,
    updatePrice,
    addToCart,
    removeFromCart,
    clearCart,
    addCombo,
    removeCombo,
    toggleCombo,
    getCartTotal,
    addComboToCart,
  };
}
