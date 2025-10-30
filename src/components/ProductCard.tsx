import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden shadow-card hover:shadow-lg transition-smooth"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image.startsWith('src/') 
            ? new URL(`../${product.image.replace('src/', '')}`, import.meta.url).href 
            : product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-smooth"
        />
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-background',
            isWishlisted && 'text-destructive'
          )}
          onClick={handleWishlist}
        >
          <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
        </Button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
