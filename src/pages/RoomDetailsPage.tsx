import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, addDays, differenceInDays } from 'date-fns';
import { 
  Users, Maximize, Wifi, Wind, Tv, Coffee, Bath, Star, 
  Check, Calendar, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRooms, setSelectedRoom } from '@/store/slices/roomsSlice';
import { addBooking } from '@/store/slices/bookingsSlice';
import { cn } from '@/lib/utils';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { rooms, selectedRoom } = useAppSelector((state) => state.rooms);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [dispatch, rooms.length]);

  useEffect(() => {
    const room = rooms.find((r) => r.id === id);
    if (room) {
      dispatch(setSelectedRoom(room));
    }
  }, [dispatch, id, rooms]);

  const roomImages = [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  ];

  const amenityIcons: Record<string, React.ReactNode> = {
    'Free WiFi': <Wifi className="w-5 h-5" />,
    'Air Conditioning': <Wind className="w-5 h-5" />,
    'Flat-screen TV': <Tv className="w-5 h-5" />,
    'Coffee Maker': <Coffee className="w-5 h-5" />,
    'Bathrobe': <Bath className="w-5 h-5" />,
  };

  const totalNights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = selectedRoom ? selectedRoom.price * totalNights : 0;

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Please sign in',
        description: 'You need to be logged in to book a room.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      toast({
        title: 'Select dates',
        description: 'Please select check-in and check-out dates.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedRoom) {
      const booking = {
        id: `BK${Date.now()}`,
        guestId: user?.id || 'guest',
        guestName: user?.name || 'Guest',
        guestEmail: user?.email || '',
        guestPhone: user?.phone || '',
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        roomType: selectedRoom.type,
        checkIn: format(checkIn, 'yyyy-MM-dd'),
        checkOut: format(checkOut, 'yyyy-MM-dd'),
        totalPrice,
        status: 'pending' as const,
        guests,
        specialRequests,
        createdAt: format(new Date(), 'yyyy-MM-dd'),
      };

      dispatch(addBooking(booking));
      toast({
        title: 'Booking Confirmed!',
        description: `Your reservation for ${selectedRoom.name} has been confirmed.`,
      });
      navigate('/booking-confirmation', { state: { booking } });
    }
  };

  if (!selectedRoom) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading room details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <button onClick={() => navigate('/rooms')} className="hover:text-secondary">
              Rooms
            </button>
            <span>/</span>
            <span className="text-foreground">{selectedRoom.name}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="relative rounded-2xl overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={roomImages[currentImageIndex]}
                  alt={selectedRoom.name}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {roomImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImageIndex ? 'bg-secondary' : 'bg-background/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Room Info */}
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    {selectedRoom.type}
                  </span>
                  <div className="flex items-center gap-1 text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {selectedRoom.name}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {selectedRoom.description}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-xl text-center">
                  <Users className="w-6 h-6 mx-auto text-secondary mb-2" />
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold text-foreground">{selectedRoom.capacity} Guests</p>
                </div>
                <div className="p-4 bg-muted rounded-xl text-center">
                  <Maximize className="w-6 h-6 mx-auto text-secondary mb-2" />
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-semibold text-foreground">{selectedRoom.size} m²</p>
                </div>
                <div className="col-span-2 p-4 bg-secondary/10 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-3xl font-bold text-secondary">${selectedRoom.price}<span className="text-base font-normal"> / night</span></p>
                </div>
              </div>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedRoom.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="text-secondary">
                          {amenityIcons[amenity] || <Check className="w-5 h-5" />}
                        </div>
                        <span className="text-sm font-medium text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-28 shadow-elegant">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-heading">Book This Room</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !checkIn && 'text-muted-foreground'
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !checkOut && 'text-muted-foreground'
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date <= (checkIn || new Date())}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label>Number of Guests</Label>
                    <Input
                      type="number"
                      min={1}
                      max={selectedRoom.capacity}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                    />
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label>Special Requests (Optional)</Label>
                    <Textarea
                      placeholder="Any special requirements?"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>

                  {/* Price Summary */}
                  {totalNights > 0 && (
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">${selectedRoom.price} × {totalNights} nights</span>
                        <span className="text-foreground">${totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxes & fees</span>
                        <span className="text-foreground">$0</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-secondary">${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleBooking}
                    className="w-full gold-gradient text-primary-foreground hover:opacity-90 h-12"
                    disabled={!selectedRoom.available}
                  >
                    {selectedRoom.available ? 'Book Now' : 'Not Available'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RoomDetailsPage;
