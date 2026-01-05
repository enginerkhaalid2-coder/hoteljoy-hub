import { Link, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  DollarSign,
  FileText,
  ClipboardList,
  UserCheck,
  UserX,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toggleTheme } from '@/store/slices/uiSlice';
import { Switch } from '@/components/ui/switch';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((state) => state.auth);
  const { theme } = useAppSelector((state) => state.ui);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Rooms', path: '/admin/rooms', icon: BedDouble },
    { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { name: 'Pricing', path: '/admin/pricing', icon: DollarSign },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const receptionistLinks = [
    { name: 'Dashboard', path: '/receptionist', icon: LayoutDashboard },
    { name: 'All Bookings', path: '/receptionist/bookings', icon: ClipboardList },
    { name: 'Arrivals', path: '/receptionist/arrivals', icon: UserCheck },
    { name: 'Departures', path: '/receptionist/departures', icon: UserX },
    { name: 'Check In/Out', path: '/receptionist/check-in-out', icon: Users },
  ];

  const links = role === 'admin' ? adminLinks : receptionistLinks;

  const handleLogout = () => {
    dispatch(logout());
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
            <span className="text-primary font-heading font-bold text-lg">GS</span>
          </div>
          {sidebarOpen && (
            <span className="font-heading text-lg font-semibold text-sidebar-foreground">
              Grand Stay
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle & User */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        <div className="flex items-center justify-between px-4">
          {sidebarOpen && <span className="text-sm text-sidebar-foreground">Dark Mode</span>}
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={() => dispatch(toggleTheme())}
          />
        </div>
        
        {sidebarOpen && (
          <div className="px-4 py-3 rounded-lg bg-sidebar-accent">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{role}</p>
          </div>
        )}

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-sidebar-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {sidebarOpen && 'Logout'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border fixed h-screen z-40"
      >
        <SidebarContent />
        
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[280px] bg-sidebar z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[80px]'} transition-all`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background border-b border-border h-16 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <Link to="/profile">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-xs font-medium text-secondary-foreground">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
