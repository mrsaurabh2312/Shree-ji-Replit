import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (productId: number, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem("sessionId");
    if (stored) return stored;
    const newId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem("sessionId", newId);
    return newId;
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart", {
        headers: {
          "x-session-id": sessionId,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: number; quantity?: number }) => {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item added to cart",
        description: "Product has been added to your cart successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const response = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error("Failed to update cart item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "x-session-id": sessionId,
        },
      });
      if (!response.ok) throw new Error("Failed to remove item from cart");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "x-session-id": sessionId,
        },
      });
      if (!response.ok) throw new Error("Failed to clear cart");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);

  const value: CartContextType = {
    items,
    totalItems,
    totalAmount,
    addItem: (productId: number, quantity?: number) => addItemMutation.mutate({ productId, quantity }),
    updateQuantity: (id: number, quantity: number) => updateQuantityMutation.mutate({ id, quantity }),
    removeItem: (id: number) => removeItemMutation.mutate(id),
    clearCart: () => clearCartMutation.mutate(),
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
