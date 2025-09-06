import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { ProductCard, Product } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";

const categories = ["All", "Clothing", "Electronics", "Furniture", "Sports", "Books", "Home & Garden"];

interface HomeProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onAddProduct: () => void;
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
  onCartClick: () => void;
  onUserClick: () => void;
}

export function Home({ products, onProductSelect, onAddProduct, cartItems, onAddToCart, onCartClick, onUserClick }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cartItems.length}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onCartClick={onCartClick}
        onUserClick={onUserClick}
      />

      <main className="container px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Discover Sustainable Treasures
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of eco-conscious buyers and sellers. Give pre-loved items a new life 
            while reducing environmental impact.
          </p>
          <Button onClick={onAddProduct} size="lg" className="shadow-lg">
            <Plus className="h-5 w-5 mr-2" />
            List Your Item
          </Button>
        </section>

        {/* Category Filters */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-lg font-semibold">Browse by Category</h2>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "All" ? "Latest Listings" : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} items found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onProductSelect}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}