import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Receptionist Pages
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard';

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:id" element={<RoomDetailsPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
            </Route>

            {/* Receptionist Routes */}
            <Route path="/receptionist" element={<ProtectedRoute allowedRoles={['receptionist']}><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<ReceptionistDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
