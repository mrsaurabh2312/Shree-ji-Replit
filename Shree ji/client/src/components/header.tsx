import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { CartSidebar } from "./cart-sidebar";

export function Header() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🕉️</span>
              <span className="text-2xl font-bold text-maroon font-serif">Sacred Essentials</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-dark-brown hover:text-saffron transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-dark-brown hover:text-saffron transition-colors">
                Products
              </Link>
              <a href="#about" className="text-dark-brown hover:text-saffron transition-colors">
                About
              </a>
              <a href="#contact" className="text-dark-brown hover:text-saffron transition-colors">
                Contact
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-warm-gray" />
              </form>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5 text-saffron" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-deep-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-saffron" />
                ) : (
                  <Menu className="h-5 w-5 text-saffron" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <form onSubmit={handleSearch} className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-warm-gray" />
              </form>
              
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="text-dark-brown hover:text-saffron transition-colors py-2">
                  Home
                </Link>
                <Link href="/products" className="text-dark-brown hover:text-saffron transition-colors py-2">
                  Products
                </Link>
                <a href="#about" className="text-dark-brown hover:text-saffron transition-colors py-2">
                  About
                </a>
                <a href="#contact" className="text-dark-brown hover:text-saffron transition-colors py-2">
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
