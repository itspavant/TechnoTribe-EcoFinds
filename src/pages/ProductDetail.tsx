import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, ShoppingCart, User, Calendar, Tag } from "lucide-react";
import { Product } from "@/components/product/ProductCard";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  cartItems: Product[];
}

export function ProductDetail({ product, onBack, onAddToCart, cartItems }: ProductDetailProps) {
  const isInCart = cartItems.some(item => item.id === product.id);

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
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Tag className="h-3 w-3 mr-1" />
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <p className="text-4xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Listed on {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Seller ID: {product.userId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="h-5 w-5 mr-2" />
                Save for Later
              </Button>
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => onAddToCart(product)}
                disabled={isInCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isInCart ? "In Cart" : "Add to Cart"}
              </Button>
            </div>

            {/* Sustainability Note */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-2">
                  🌱 Sustainable Choice
                </h3>
                <p className="text-sm text-muted-foreground">
                  By purchasing this pre-owned item, you're helping reduce waste and 
                  supporting a circular economy. Every second-hand purchase makes a difference!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}