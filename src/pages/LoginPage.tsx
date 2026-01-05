import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess, UserRole } from '@/store/slices/authSlice';

const mockUsers = [
  { email: 'guest@hotel.com', password: 'guest123', name: 'John Guest', role: 'guest' as UserRole },
  { email: 'reception@hotel.com', password: 'reception123', name: 'Sarah Receptionist', role: 'receptionist' as UserRole },
  { email: 'admin@hotel.com', password: 'admin123', name: 'Michael Admin', role: 'admin' as UserRole },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      dispatch(loginSuccess({
        id: Date.now().toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: '+1 555-0100',
      }));

      toast({
        title: 'Welcome back!',
        description: `Logged in as ${user.name}`,
      });

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'receptionist') {
        navigate('/receptionist');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  const handleQuickLogin = (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
            <span className="text-primary font-heading font-bold text-xl">GS</span>
          </div>
          <span className="font-heading text-2xl font-semibold text-primary-foreground">
            Grand Stay
          </span>
        </Link>

        <Card className="shadow-elegant">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-heading text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gold-gradient text-primary-foreground h-12"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                {/* Quick Login Buttons */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Quick login for demo:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickLogin('guest')}
                    >
                      Guest
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickLogin('receptionist')}
                    >
                      Staff
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickLogin('admin')}
                    >
                      Admin
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gold-gradient text-primary-foreground h-12"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-primary-foreground/60 text-sm mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
