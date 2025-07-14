import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Truck, Shield, Award, Headphones } from "lucide-react";
import { Category, Product } from "@shared/schema";

export default function Home() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products", "featured"],
    queryFn: async () => {
      const response = await fetch("/api/products?featured=true");
      if (!response.ok) throw new Error("Failed to fetch featured products");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-saffron to-gold py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1532664189809-02133fee698d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Sacred Essentials for Your Spiritual Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Authentic pooja samgri and spiritual products crafted with devotion
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-white text-saffron hover:bg-cream">
                Shop Now →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-maroon font-serif">
            Browse Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <img
                      src={category.image || ""}
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-saffron transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-warm-gray">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-maroon font-serif">
            Featured Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" className="bg-maroon hover:bg-red-800 text-white">
                View All Products →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-warm-gray">On orders above ₹500</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-warm-gray">100% secure checkout</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Authentic Products</h3>
              <p className="text-warm-gray">Traditionally crafted items</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-warm-gray">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-maroon font-serif">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "Beautiful quality products and fast delivery. The brass diyas are exactly as described and perfect for our daily prayers.",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                text: "Excellent service and authentic products. The incense sticks have amazing fragrance and the packaging was perfect.",
                rating: 5
              },
              {
                name: "Meera Patel",
                location: "Bangalore",
                text: "I've been ordering from Sacred Essentials for months. Their products are always fresh and of the highest quality. Highly recommend!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-gold">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <span className="ml-2 text-warm-gray text-sm">5/5</span>
                  </div>
                  <p className="text-dark-brown mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-saffron rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-warm-gray text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="contact" className="py-16 bg-gradient-to-r from-maroon to-deep-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Stay Connected</h2>
          <p className="text-xl mb-8">Get updates on new arrivals and special offers</p>
          <div className="max-w-md mx-auto flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-r-none text-dark-brown"
            />
            <Button className="bg-gold text-dark-brown hover:bg-yellow-400 rounded-l-none">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
