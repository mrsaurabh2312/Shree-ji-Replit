import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Truck, Package } from "lucide-react";

interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  product: {
    id: number;
    name: string;
    image: string;
  };
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function Orders() {
  const params = useParams();
  const orderNumber = params.orderNumber;

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", orderNumber],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${orderNumber}`);
      if (!response.ok) {
        throw new Error("Order not found");
      }
      return response.json();
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Loading order details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-maroon mb-4">Order Not Found</h1>
            <p className="text-warm-gray">The order you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-maroon mb-2">Order Details</h1>
          <p className="text-warm-gray">Order #{order.orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-warm-gray">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p><strong>Customer:</strong> {order.customerName}</p>
                  <p><strong>Email:</strong> {order.customerEmail}</p>
                  <p><strong>Phone:</strong> {order.customerPhone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{order.shippingAddress}</p>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items Ordered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-warm-gray">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600">
                      {parseFloat(order.totalAmount) >= 500 ? "Free" : "₹50"}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-saffron">₹{order.totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Success Message */}
            {order.status === "pending" && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Order Confirmed!</h3>
                    <p className="text-sm text-warm-gray">
                      Thank you for your order. We'll send you an email confirmation
                      and updates on your order status.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
