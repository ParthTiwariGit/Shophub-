import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { ShoppingBag, Truck, Shield, ArrowRight } from 'lucide-react';
import productsData from '@/data/products.json';
import categoryMen from '@/assets/category-men.jpg';
import categoryWomen from '@/assets/category-women.jpg';
import categoryElectronics from '@/assets/category-electronics.jpg';

const Home = () => {
  const featuredProducts = productsData.filter((p) => p.featured).slice(0, 4);
  const categories = [
    { name: 'Men', image: categoryMen, link: '/shop?category=Men' },
    { name: 'Women', image: categoryWomen, link: '/shop?category=Women' },
    { name: 'Electronics', image: categoryElectronics, link: '/shop?category=Electronics' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Style
              <span className="block text-primary">Shop the Latest Trends</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our curated collection of fashion, electronics, and lifestyle products.
              Quality guaranteed, delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="gap-2">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop?featured=true">
                <Button variant="outline" size="lg">
                  View Featured
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} to={category.link}>
                <Card className="group overflow-hidden cursor-pointer shadow-card hover:shadow-lg transition-smooth">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                      <h3 className="text-2xl font-bold p-6">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <Link to="/shop">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">On orders over $50</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                <p className="text-muted-foreground">100% secure transactions</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">30-day return policy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">ShopHub</h3>
              <p className="text-muted-foreground">
                Your one-stop destination for fashion, electronics, and lifestyle products.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/shop?category=Men" className="hover:text-primary transition-smooth">Men</Link></li>
                <li><Link to="/shop?category=Women" className="hover:text-primary transition-smooth">Women</Link></li>
                <li><Link to="/shop?category=Electronics" className="hover:text-primary transition-smooth">Electronics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Shipping Info</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
