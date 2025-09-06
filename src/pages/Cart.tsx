import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import { Product } from "@/components/product/ProductCard";

interface CartProps {
  cartItems: Product[];
  onBack: () => void;
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
}

export function Cart({ cartItems, onBack, onRemoveFromCart, onCheckout }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const savings = cartItems.length * 25; // Mock savings calculation

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} />

      <main className="container px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover amazing pre-owned items and start your sustainable shopping journey!
                  </p>
                  <Button onClick={onBack}>
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge variant="secondary" className="mb-2">
                                {item.category}
                              </Badge>
                              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-2xl font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Estimated Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={onCheckout}
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Sustainability Impact */}
                  <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-primary mb-2">
                        🌍 Environmental Impact
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        By choosing pre-owned items, you're saving approximately {savings}kg of CO2 
                        and reducing waste by extending product lifecycles.
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}