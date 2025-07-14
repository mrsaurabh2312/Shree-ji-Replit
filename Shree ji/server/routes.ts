import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured, search } = req.query;
      
      let products;
      if (category) {
        products = await storage.getProductsByCategory(parseInt(category as string));
      } else if (featured === "true") {
        products = await storage.getFeaturedProducts();
      } else if (search) {
        products = await storage.searchProducts(search as string);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "anonymous";
      const cartItems = await storage.getCartItems(sessionId);
      
      // Get product details for each cart item
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProductById(item.productId!);
          return { ...item, product };
        })
      );
      
      res.json(itemsWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "anonymous";
      const cartItemData = insertCartItemSchema.parse({
        ...req.body,
        sessionId
      });
      
      const cartItem = await storage.addCartItem(cartItemData);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add item to cart" });
      }
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (quantity <= 0) {
        await storage.removeCartItem(id);
        res.json({ message: "Item removed from cart" });
      } else {
        const updatedItem = await storage.updateCartItem(id, quantity);
        if (!updatedItem) {
          return res.status(404).json({ message: "Cart item not found" });
        }
        res.json(updatedItem);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeCartItem(id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "anonymous";
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Orders
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:orderNumber", async (req, res) => {
    try {
      const orderNumber = req.params.orderNumber;
      const order = await storage.getOrderByNumber(orderNumber);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const orderItems = await storage.getOrderItems(order.id);
      const itemsWithProducts = await Promise.all(
        orderItems.map(async (item) => {
          const product = await storage.getProductById(item.productId!);
          return { ...item, product };
        })
      );
      
      res.json({ ...order, items: itemsWithProducts });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "anonymous";
      const orderData = insertOrderSchema.parse(req.body);
      
      // Get cart items
      const cartItems = await storage.getCartItems(sessionId);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      
      // Calculate total
      let totalAmount = 0;
      for (const item of cartItems) {
        const product = await storage.getProductById(item.productId!);
        if (product) {
          totalAmount += parseFloat(product.price) * item.quantity;
        }
      }
      
      // Create order
      const order = await storage.createOrder({
        ...orderData,
        totalAmount: totalAmount.toFixed(2)
      });
      
      // Create order items
      for (const item of cartItems) {
        const product = await storage.getProductById(item.productId!);
        if (product) {
          await storage.createOrderItem({
            orderId: order.id,
            productId: item.productId!,
            quantity: item.quantity,
            price: product.price
          });
        }
      }
      
      // Clear cart
      await storage.clearCart(sessionId);
      
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid order data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create order" });
      }
    }
  });

  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const order = await storage.updateOrderStatus(id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
