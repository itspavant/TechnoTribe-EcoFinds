import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Edit, Trash2 } from "lucide-react";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  userId: string;
  createdAt: string;
}

interface ProductCardProps {
  product: Product;
  isOwner?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ 
  product, 
  isOwner = false, 
  onEdit, 
  onDelete, 
  onAddToCart,
  onViewDetails 
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)] cursor-pointer">
      <div onClick={() => onViewDetails?.(product)}>
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-4">
          {/* Category Badge */}
          <Badge variant="secondary" className="mb-2 text-xs">
            {product.category}
          </Badge>

          {/* Title */}
          <h3 className="font-semibold line-clamp-2 text-sm mb-2">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
      </div>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {isOwner ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit?.(product)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onDelete?.(product.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              className="flex-1"
              size="sm"
              onClick={() => onAddToCart?.(product)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}