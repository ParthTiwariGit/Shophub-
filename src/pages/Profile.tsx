import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, ShoppingBag, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: any[];
}

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShoppingBag className="h-4 w-4" />
                    <span className="text-sm">
                      {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground mb-4">
                      No orders yet
                    </p>
                    <Button onClick={() => navigate('/shop')}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.reverse().map((order) => (
                      <Card key={order.id} className="shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="mb-2">
                                {order.status}
                              </Badge>
                              <p className="font-bold text-lg">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <Separator className="my-3" />

                          <div className="space-y-2">
                            {order.items.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-muted-foreground">
                                  {item.name} x {item.quantity}
                                </span>
                                <span className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
