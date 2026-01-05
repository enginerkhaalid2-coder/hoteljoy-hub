import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="font-heading text-8xl font-bold text-secondary mb-4">404</h1>
        <p className="text-2xl text-primary-foreground mb-2">Page Not Found</p>
        <p className="text-primary-foreground/70 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button className="gold-gradient text-primary-foreground">
            <Home className="mr-2 w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
