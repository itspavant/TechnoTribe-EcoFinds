import { useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Home } from "@/pages/Home";
import { ProductDetail } from "@/pages/ProductDetail";
import { Cart } from "@/pages/Cart";
import { AddProductForm } from "@/components/product/AddProductForm";
import { UserDashboard } from "@/components/user/UserDashboard";
import { MyListings } from "@/pages/MyListings";
import { Product } from "@/components/product/ProductCard";
import { useToast } from "@/hooks/use-toast";
import leatherJacketImg from "@/assets/leather-jacket.jpg";
import coffeeTableImg from "@/assets/coffee-table.jpg";
import iphoneImg from "@/assets/iphone.jpg";
import mountainBikeImg from "@/assets/mountain-bike.jpg";

type Page = "auth" | "home" | "product-detail" | "cart" | "add-product" | "user-dashboard" | "my-listings";

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket in excellent condition. Perfect for sustainable fashion lovers.",
    price: 89.99,
    category: "Clothing",
    image: leatherJacketImg,
    userId: "user1",
    createdAt: "2024-01-15"
  },
  {
    id: "2", 
    title: "Wooden Coffee Table",
    description: "Beautiful handcrafted wooden coffee table. Some minor wear but structurally perfect.",
    price: 150.00,
    category: "Furniture",
    image: coffeeTableImg,
    userId: "user2",
    createdAt: "2024-01-14"
  },
  {
    id: "3",
    title: "iPhone 12 Pro",
    description: "Gently used iPhone 12 Pro in space gray. Includes original charger and case.",
    price: 599.99,
    category: "Electronics",
    image: iphoneImg,
    userId: "user3",
    createdAt: "2024-01-13"
  },
  {
    id: "4",
    title: "Mountain Bike",
    description: "Trek mountain bike, well-maintained with recent tune-up. Great for outdoor adventures.",
    price: 400.00,
    category: "Sports",
    image: mountainBikeImg,
    userId: "user4",
    createdAt: "2024-01-12"
  }
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("auth");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>(mockProducts);
  const [userListings, setUserListings] = useState<Product[]>([]);
  const { toast } = useToast();

  const handleAuth = (data: { email: string; password: string; username?: string }) => {
    // Simulate authentication
    toast({
      title: authMode === "login" ? "Welcome back!" : "Account created!",
      description: `Successfully ${authMode === "login" ? "signed in" : "registered"} as ${data.email}`,
    });
    setCurrentPage("home");
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
  };

  const handleAddToCart = (product: Product) => {
    const isAlreadyInCart = cartItems.some(item => item.id === product.id);
    if (!isAlreadyInCart) {
      setCartItems([...cartItems, product]);
      toast({
        title: "Added to cart!",
        description: `${product.title} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Already in cart",
        description: `${product.title} is already in your cart.`,
        variant: "destructive",
      });
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    // Add purchased items to purchase history
    setPurchaseHistory(prev => [...prev, ...cartItems]);
    toast({
      title: "Checkout successful!",
      description: `Purchased ${cartItems.length} items. Thank you for choosing sustainable shopping!`,
    });
    setCartItems([]);
    setCurrentPage("home");
  };

  const handleAddProduct = () => {
    setCurrentPage("add-product");
  };

  const handleProductSubmit = (data: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image ? URL.createObjectURL(data.image) : "/placeholder.svg",
      userId: "current-user",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to both all products and user listings
    setAllProducts(prev => [newProduct, ...prev]);
    setUserListings(prev => [newProduct, ...prev]);
    
    toast({
      title: "Product listed successfully!",
      description: `${data.title} has been added to the marketplace.`,
    });
    setCurrentPage("home");
  };

  const handleEditProduct = (product: Product) => {
    // In a real app, this would open an edit form
    toast({
      title: "Edit product",
      description: "Edit functionality coming soon!",
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setAllProducts(prev => prev.filter(p => p.id !== productId));
    setUserListings(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Product deleted",
      description: "Product has been removed from your listings.",
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "auth":
        return (
          <AuthForm
            mode={authMode}
            onSubmit={handleAuth}
            onModeChange={setAuthMode}
          />
        );
      case "home":
        return (
          <Home
            products={allProducts}
            onProductSelect={handleProductSelect}
            onAddProduct={handleAddProduct}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onCartClick={() => setCurrentPage("cart")}
            onUserClick={() => setCurrentPage("user-dashboard")}
          />
        );
      case "product-detail":
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentPage("home")}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
        ) : null;
      case "cart":
        return (
          <Cart
            cartItems={cartItems}
            onBack={() => setCurrentPage("home")}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        );
      case "add-product":
        return (
          <AddProductForm
            onBack={() => setCurrentPage("home")}
            onSubmit={handleProductSubmit}
          />
        );
      case "user-dashboard":
        return (
          <UserDashboard
            onBack={() => setCurrentPage("home")}
            userListings={userListings}
            purchaseHistory={purchaseHistory}
          />
        );
      case "my-listings":
        return (
          <MyListings
            onBack={() => setCurrentPage("home")}
            onAddProduct={handleAddProduct}
            userListings={userListings}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
};

export default Index;
