import { useEffect } from 'react';
import { format, isToday } from 'date-fns';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBookings } from '@/store/slices/bookingsSlice';

const ReceptionistDashboard = () => {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const todayArrivals = bookings.filter(b => isToday(new Date(b.checkIn)) && b.status !== 'cancelled');
  const todayDepartures = bookings.filter(b => isToday(new Date(b.checkOut)) && b.status === 'checked-in');
  const checkedIn = bookings.filter(b => b.status === 'checked-in');

  const stats = [
    { title: 'Today\'s Arrivals', value: todayArrivals.length, icon: Users, color: 'bg-blue-500' },
    { title: 'Today\'s Departures', value: todayDepartures.length, icon: ArrowRight, color: 'bg-orange-500' },
    { title: 'Currently Checked In', value: checkedIn.length, icon: Calendar, color: 'bg-green-500' },
    { title: 'Pending Bookings', value: bookings.filter(b => b.status === 'pending').length, icon: Clock, color: 'bg-secondary' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Receptionist Dashboard</h1>
        <p className="text-muted-foreground">Manage check-ins, check-outs, and guest services.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Today's Arrivals</CardTitle></CardHeader>
          <CardContent>
            {todayArrivals.length === 0 ? <p className="text-muted-foreground">No arrivals today</p> : (
              <div className="space-y-3">
                {todayArrivals.map((b) => (
                  <div key={b.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div><p className="font-medium">{b.guestName}</p><p className="text-sm text-muted-foreground">{b.roomName}</p></div>
                    <span className="text-sm text-muted-foreground">{b.guests} guests</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Today's Departures</CardTitle></CardHeader>
          <CardContent>
            {todayDepartures.length === 0 ? <p className="text-muted-foreground">No departures today</p> : (
              <div className="space-y-3">
                {todayDepartures.map((b) => (
                  <div key={b.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div><p className="font-medium">{b.guestName}</p><p className="text-sm text-muted-foreground">{b.roomName}</p></div>
                    <span className="text-sm text-muted-foreground">${b.totalPrice}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
