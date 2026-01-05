import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Calendar, DollarSign, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRooms } from '@/store/slices/roomsSlice';
import { fetchBookings } from '@/store/slices/bookingsSlice';

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.rooms);
  const { bookings } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchBookings());
  }, [dispatch]);

  const stats = [
    { title: 'Total Rooms', value: rooms.length, icon: BedDouble, color: 'bg-blue-500' },
    { title: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'bg-green-500' },
    { title: 'Revenue', value: `$${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}`, icon: DollarSign, color: 'bg-secondary' },
    { title: 'Occupied Rooms', value: bookings.filter(b => b.status === 'checked-in').length, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your hotel overview.</p>
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

      <Card>
        <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{booking.guestName}</p>
                  <p className="text-sm text-muted-foreground">{booking.roomName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'checked-in' ? 'bg-green-100 text-green-700' : booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
