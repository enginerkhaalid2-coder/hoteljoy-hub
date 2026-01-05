import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Booking } from '@/store/slices/bookingsSlice';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const booking = location.state?.booking as Booking | undefined;

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
            No Booking Found
          </h1>
          <p className="text-muted-foreground mb-8">
            It seems there's no booking information available.
          </p>
          <Link to="/rooms">
            <Button className="gold-gradient text-primary-foreground">
              Browse Rooms
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for choosing Grand Stay Hotel. Your reservation has been confirmed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto shadow-elegant">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Reference</p>
                    <p className="text-xl font-bold text-secondary">{booking.id}</p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium capitalize">
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {booking.roomName}
                    </h3>
                    <p className="text-muted-foreground">{booking.roomType} Room</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-secondary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-medium text-foreground">{booking.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-secondary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-medium text-foreground">{booking.checkOut}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Guests</p>
                      <p className="font-medium text-foreground">{booking.guests} Guest(s)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hotel Address</p>
                      <p className="font-medium text-foreground">123 Main Street, Downtown, City Center</p>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Special Requests</p>
                      <p className="text-foreground">{booking.specialRequests}</p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold text-secondary">${booking.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/bookings">
              <Button variant="outline" className="w-full sm:w-auto">
                View My Bookings
              </Button>
            </Link>
            <Link to="/">
              <Button className="w-full sm:w-auto gold-gradient text-primary-foreground">
                Back to Home
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
