import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import productsData from '@/data/products.json';
import { useCart } from '@/contexts/CartContext';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const { wishlist } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Men', 'Women', 'Electronics'];

  useEffect(() => {
    const category = searchParams.get('category');
    const wishlistFilter = searchParams.get('wishlist');
    
    if (category) {
      setSelectedCategory(category);
    }

    let filtered = productsData;

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Wishlist filter
    if (wishlistFilter === 'true') {
      filtered = filtered.filter((p) => wishlist.includes(p.id));
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchParams, searchQuery, wishlist]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="md:w-64 space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-card">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    min={0}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-4"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 300]);
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">
                {searchParams.get('wishlist') === 'true'
                  ? 'My Wishlist'
                  : selectedCategory === 'all'
                  ? 'All Products'
                  : selectedCategory}
              </h1>
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 300]);
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
