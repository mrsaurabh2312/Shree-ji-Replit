import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product.id, 1);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-warm-gray text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-saffron font-bold text-lg">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-warm-gray line-through text-sm">₹{product.originalPrice}</span>
            )}
          </div>
          {product.featured && (
            <Badge variant="secondary" className="bg-gold text-dark-brown">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {product.inStock ? (
              <span className="text-green-600 text-sm">In Stock</span>
            ) : (
              <span className="text-red-600 text-sm">Out of Stock</span>
            )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-saffron hover:bg-orange-600 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
