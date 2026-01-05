import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/uiSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader><CardTitle className="font-heading text-2xl">Settings</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                </div>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={() => dispatch(toggleTheme())} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
