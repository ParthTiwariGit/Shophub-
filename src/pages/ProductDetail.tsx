import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import productsData from '@/data/products.json';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image.startsWith('src/') 
          ? new URL(`../${product.image.replace('src/', '')}`, import.meta.url).href 
          : product.image,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image.startsWith('src/') 
                ? new URL(`../${product.image.replace('src/', '')}`, import.meta.url).href 
                : product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-3xl font-bold text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
              {product.inStock ? (
                <Badge variant="outline" className="bg-success/10 text-success border-success">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => toggleWishlist(product.id)}
                className={cn(isWishlisted && 'border-destructive text-destructive')}
              >
                <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
              </Button>
            </div>

            <div className="pt-6 border-t space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="font-medium">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
