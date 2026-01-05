import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const { user, role } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader><CardTitle className="font-heading text-2xl">My Profile</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-xl font-semibold">{user?.name || 'Guest User'}</p>
                <p className="text-muted-foreground capitalize">{role || 'guest'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-secondary" /><span>{user?.email || 'Not provided'}</span></div>
              <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-secondary" /><span>{user?.phone || 'Not provided'}</span></div>
              <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-secondary" /><span className="capitalize">{role || 'guest'} Access</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
