import { 
  categories, 
  products, 
  cartItems, 
  orders, 
  orderItems,
  type Category, 
  type Product, 
  type CartItem, 
  type Order, 
  type OrderItem,
  type InsertCategory,
  type InsertProduct,
  type InsertCartItem,
  type InsertOrder,
  type InsertOrderItem
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Orders
  getOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category> = new Map();
  private products: Map<number, Product> = new Map();
  private cartItems: Map<number, CartItem> = new Map();
  private orders: Map<number, Order> = new Map();
  private orderItems: Map<number, OrderItem> = new Map();
  private categoryId = 1;
  private productId = 1;
  private cartItemId = 1;
  private orderId = 1;
  private orderItemId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData: InsertCategory[] = [
      { name: "Diyas & Lamps", description: "Traditional oil lamps", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400", slug: "diyas-lamps" },
      { name: "Incense & Dhoop", description: "Aromatic sticks & cones", image: "https://pixabay.com/get/g8cbdd8d7a878267250bc88b51794ffe8f3f05060d4e8cba392ee8206891931986d7e74021eeac010eb3564db2b954bf312c75692e08e33cfe94c683a8e8e31c4_1280.jpg", slug: "incense-dhoop" },
      { name: "Idols & Statues", description: "Sacred deities", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400", slug: "idols-statues" },
      { name: "Pooja Accessories", description: "Brass plates & vessels", image: "https://pixabay.com/get/gcc419b0376194c136ca7a35edfa1e882a44ddca65c4babf18fe0327a760afba4b0479df668ff56e0aa0702f55bd39a1631dcbeedfb6dc0bbe9af9159d4adad35_1280.jpg", slug: "pooja-accessories" },
      { name: "Flowers & Garlands", description: "Fresh & artificial", image: "https://pixabay.com/get/ge36b14f028130858ad37518a801d278827b8fb1ead0d4e2ee613e7680342307a62f1f7754b65d2fbd8f30a7ebf898eb714d8b4061f3bed6cf1a7ccd6aab0fc07_1280.jpg", slug: "flowers-garlands" },
      { name: "Books & Texts", description: "Sacred scriptures", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400", slug: "books-texts" },
      { name: "Bells & Chimes", description: "Sacred sounds", image: "https://pixabay.com/get/gd7bb24ee8cfc459be2c8acf72d8ef1679683700f567708c886ee328447cd365c2b0810292e4441795f7e189fed510e248e86ef0a0d1c8a43505d2f241f90ea52_1280.jpg", slug: "bells-chimes" },
      { name: "Rangoli & Decor", description: "Colorful designs", image: "https://pixabay.com/get/g2404ee334a24072a6c66ac32a415d4b72dccb5989f3528f817af8ba44024fa9226448cfd19eb2f2cc601f4a498bfdfbced2fbb01ffa430d314206475b3029e73_1280.jpg", slug: "rangoli-decor" }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { ...cat, id: this.categoryId++ };
      this.categories.set(category.id, category);
    });

    // Seed products
    const productsData: InsertProduct[] = [
      {
        name: "Premium Brass Diya Set",
        description: "Handcrafted brass diyas with intricate patterns, perfect for daily prayers and festivals",
        price: "299.00",
        originalPrice: "399.00",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"],
        categoryId: 1,
        inStock: true,
        stockQuantity: 50,
        featured: true,
        tags: ["brass", "traditional", "handcrafted"]
      },
      {
        name: "Sandalwood Incense Sticks",
        description: "Pure sandalwood incense sticks, 100 pieces, natural fragrance for meditation and prayers",
        price: "199.00",
        originalPrice: "249.00",
        image: "https://pixabay.com/get/g5a0fd005175d30632988907516b381ff9515784472e480ca1f5e16a777ee66f31617ac114dd7a88f01a0baead57e9a13e5c89cca99626e7949bcf8f3446287ec_1280.jpg",
        images: ["https://pixabay.com/get/g5a0fd005175d30632988907516b381ff9515784472e480ca1f5e16a777ee66f31617ac114dd7a88f01a0baead57e9a13e5c89cca99626e7949bcf8f3446287ec_1280.jpg"],
        categoryId: 2,
        inStock: true,
        stockQuantity: 100,
        featured: true,
        tags: ["sandalwood", "incense", "natural"]
      },
      {
        name: "Brass Ganesha Idol",
        description: "Handcrafted brass Ganesha statue, 6 inches tall, perfect for home temple",
        price: "899.00",
        originalPrice: "1199.00",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
        images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400"],
        categoryId: 3,
        inStock: true,
        stockQuantity: 25,
        featured: true,
        tags: ["ganesha", "brass", "idol"]
      },
      {
        name: "Complete Pooja Thali Set",
        description: "7-piece brass pooja thali with diya, incense holder, kumkum box, and more",
        price: "599.00",
        originalPrice: "799.00",
        image: "https://pixabay.com/get/g40f2e4d171b561ed53e4875aa3e512db36092f354f828e621e425f2d8fa020a04d3627436b18714d0e91fdf84920dd4ed20e3efe531229886e739ec16a662263_1280.jpg",
        images: ["https://pixabay.com/get/g40f2e4d171b561ed53e4875aa3e512db36092f354f828e621e425f2d8fa020a04d3627436b18714d0e91fdf84920dd4ed20e3efe531229886e739ec16a662263_1280.jpg"],
        categoryId: 4,
        inStock: true,
        stockQuantity: 30,
        featured: true,
        tags: ["thali", "brass", "complete-set"]
      },
      {
        name: "Marigold Flower Garland",
        description: "Fresh marigold garland, 3 feet long, perfect for deity decoration",
        price: "149.00",
        image: "https://pixabay.com/get/ge36b14f028130858ad37518a801d278827b8fb1ead0d4e2ee613e7680342307a62f1f7754b65d2fbd8f30a7ebf898eb714d8b4061f3bed6cf1a7ccd6aab0fc07_1280.jpg",
        images: ["https://pixabay.com/get/ge36b14f028130858ad37518a801d278827b8fb1ead0d4e2ee613e7680342307a62f1f7754b65d2fbd8f30a7ebf898eb714d8b4061f3bed6cf1a7ccd6aab0fc07_1280.jpg"],
        categoryId: 5,
        inStock: true,
        stockQuantity: 20,
        featured: false,
        tags: ["marigold", "fresh", "garland"]
      },
      {
        name: "Bhagavad Gita (Hindi)",
        description: "Complete Bhagavad Gita with Hindi translation and commentary",
        price: "399.00",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
        images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"],
        categoryId: 6,
        inStock: true,
        stockQuantity: 40,
        featured: false,
        tags: ["bhagavad-gita", "hindi", "scripture"]
      },
      {
        name: "Brass Prayer Bell",
        description: "Traditional brass prayer bell with wooden handle, clear melodious sound",
        price: "249.00",
        image: "https://pixabay.com/get/gd7bb24ee8cfc459be2c8acf72d8ef1679683700f567708c886ee328447cd365c2b0810292e4441795f7e189fed510e248e86ef0a0d1c8a43505d2f241f90ea52_1280.jpg",
        images: ["https://pixabay.com/get/gd7bb24ee8cfc459be2c8acf72d8ef1679683700f567708c886ee328447cd365c2b0810292e4441795f7e189fed510e248e86ef0a0d1c8a43505d2f241f90ea52_1280.jpg"],
        categoryId: 7,
        inStock: true,
        stockQuantity: 35,
        featured: false,
        tags: ["bell", "brass", "prayer"]
      },
      {
        name: "Rangoli Powder Set",
        description: "Set of 8 vibrant colors for creating beautiful rangoli designs",
        price: "179.00",
        image: "https://pixabay.com/get/g2404ee334a24072a6c66ac32a415d4b72dccb5989f3528f817af8ba44024fa9226448cfd19eb2f2cc601f4a498bfdfbced2fbb01ffa430d314206475b3029e73_1280.jpg",
        images: ["https://pixabay.com/get/g2404ee334a24072a6c66ac32a415d4b72dccb5989f3528f817af8ba44024fa9226448cfd19eb2f2cc601f4a498bfdfbced2fbb01ffa430d314206475b3029e73_1280.jpg"],
        categoryId: 8,
        inStock: true,
        stockQuantity: 60,
        featured: false,
        tags: ["rangoli", "colors", "decoration"]
      }
    ];

    productsData.forEach(prod => {
      const product: Product = { ...prod, id: this.productId++ };
      this.products.set(product.id, product);
    });
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = { ...category, id: this.categoryId++ };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.categoryId === categoryId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = { ...product, id: this.productId++ };
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = { ...existing, ...product };
    this.products.set(id, updated);
    return updated;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addCartItem(item: InsertCartItem): Promise<CartItem> {
    const existingItem = Array.from(this.cartItems.values()).find(
      ci => ci.sessionId === item.sessionId && ci.productId === item.productId
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
      return existingItem;
    }

    const newItem: CartItem = { 
      ...item, 
      id: this.cartItemId++, 
      createdAt: new Date()
    };
    this.cartItems.set(newItem.id, newItem);
    return newItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    item.quantity = quantity;
    return item;
  }

  async removeCartItem(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    items.forEach(item => this.cartItems.delete(item.id));
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(order => order.orderNumber === orderNumber);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newOrder: Order = { 
      ...order, 
      id: this.orderId++, 
      orderNumber,
      createdAt: new Date()
    };
    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    order.status = status;
    return order;
  }

  // Order Items
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const newItem: OrderItem = { ...item, id: this.orderItemId++ };
    this.orderItems.set(newItem.id, newItem);
    return newItem;
  }
}

export const storage = new MemStorage();
