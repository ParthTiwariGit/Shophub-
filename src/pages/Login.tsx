import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onLogin = async (data: LoginForm) => {
    setIsLoading(true);
    const success = await login(data.email, data.password);
    setIsLoading(false);

    if (success) {
      toast.success('Logged in successfully!');
      const redirect = searchParams.get('redirect');
      navigate(redirect ? `/${redirect}` : '/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const onSignup = async (data: SignupForm) => {
    setIsLoading(true);
    const success = await signup(data.name, data.email, data.password);
    setIsLoading(false);

    if (success) {
      toast.success('Account created successfully!');
      const redirect = searchParams.get('redirect');
      navigate(redirect ? `/${redirect}` : '/');
    } else {
      toast.error('Email already exists');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary">
            ShopHub
          </Link>
          <p className="text-muted-foreground mt-2">
            Welcome back! Please login to your account
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      {...loginForm.register('email')}
                      placeholder="john@example.com"
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      {...loginForm.register('password')}
                      placeholder="••••••••"
                    />
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create a new account to start shopping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      {...signupForm.register('name')}
                      placeholder="John Doe"
                    />
                    {signupForm.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      {...signupForm.register('email')}
                      placeholder="john@example.com"
                    />
                    {signupForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      {...signupForm.register('password')}
                      placeholder="••••••••"
                    />
                    {signupForm.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      {...signupForm.register('confirmPassword')}
                      placeholder="••••••••"
                    />
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">
                        {signupForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
