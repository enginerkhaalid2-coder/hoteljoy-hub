import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';

export interface Booking {
  id: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: BookingStatus;
  guests: number;
  specialRequests?: string;
  createdAt: string;
}

interface BookingsState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: 'BK001',
    guestId: 'g1',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    guestPhone: '+1 555-0101',
    roomId: '3',
    roomName: 'Deluxe City View',
    roomType: 'Deluxe',
    checkIn: format(today, 'yyyy-MM-dd'),
    checkOut: format(nextWeek, 'yyyy-MM-dd'),
    totalPrice: 1540,
    status: 'confirmed',
    guests: 2,
    specialRequests: 'Late checkout if possible',
    createdAt: format(new Date(today.getTime() - 86400000 * 3), 'yyyy-MM-dd'),
  },
  {
    id: 'BK002',
    guestId: 'g2',
    guestName: 'Emily Johnson',
    guestEmail: 'emily.j@email.com',
    guestPhone: '+1 555-0102',
    roomId: '5',
    roomName: 'Executive Suite',
    roomType: 'Suite',
    checkIn: format(today, 'yyyy-MM-dd'),
    checkOut: format(tomorrow, 'yyyy-MM-dd'),
    totalPrice: 380,
    status: 'pending',
    guests: 2,
    createdAt: format(new Date(today.getTime() - 86400000), 'yyyy-MM-dd'),
  },
  {
    id: 'BK003',
    guestId: 'g3',
    guestName: 'Michael Brown',
    guestEmail: 'mbrown@email.com',
    guestPhone: '+1 555-0103',
    roomId: '7',
    roomName: 'Royal Penthouse',
    roomType: 'Penthouse',
    checkIn: format(new Date(today.getTime() - 86400000 * 2), 'yyyy-MM-dd'),
    checkOut: format(today, 'yyyy-MM-dd'),
    totalPrice: 1700,
    status: 'checked-in',
    guests: 3,
    specialRequests: 'Champagne upon arrival',
    createdAt: format(new Date(today.getTime() - 86400000 * 5), 'yyyy-MM-dd'),
  },
  {
    id: 'BK004',
    guestId: 'g4',
    guestName: 'Sarah Davis',
    guestEmail: 'sarah.d@email.com',
    guestPhone: '+1 555-0104',
    roomId: '1',
    roomName: 'Classic Comfort Room',
    roomType: 'Standard',
    checkIn: format(tomorrow, 'yyyy-MM-dd'),
    checkOut: format(new Date(tomorrow.getTime() + 86400000 * 3), 'yyyy-MM-dd'),
    totalPrice: 360,
    status: 'confirmed',
    guests: 1,
    createdAt: format(today, 'yyyy-MM-dd'),
  },
  {
    id: 'BK005',
    guestId: 'g5',
    guestName: 'Robert Wilson',
    guestEmail: 'rwilson@email.com',
    guestPhone: '+1 555-0105',
    roomId: '6',
    roomName: 'Family Suite',
    roomType: 'Suite',
    checkIn: format(new Date(today.getTime() - 86400000 * 4), 'yyyy-MM-dd'),
    checkOut: format(new Date(today.getTime() - 86400000), 'yyyy-MM-dd'),
    totalPrice: 1680,
    status: 'checked-out',
    guests: 4,
    createdAt: format(new Date(today.getTime() - 86400000 * 10), 'yyyy-MM-dd'),
  },
  {
    id: 'BK006',
    guestId: 'g6',
    guestName: 'Jennifer Lee',
    guestEmail: 'jlee@email.com',
    guestPhone: '+1 555-0106',
    roomId: '4',
    roomName: 'Deluxe Garden Room',
    roomType: 'Deluxe',
    checkIn: format(today, 'yyyy-MM-dd'),
    checkOut: format(new Date(today.getTime() + 86400000 * 5), 'yyyy-MM-dd'),
    totalPrice: 1000,
    status: 'confirmed',
    guests: 2,
    specialRequests: 'Room facing the garden please',
    createdAt: format(new Date(today.getTime() - 86400000 * 2), 'yyyy-MM-dd'),
  },
];

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockBookings;
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [] as Booking[],
    selectedBooking: null as Booking | null,
    loading: false,
    error: null as string | null,
  } as BookingsState,
  reducers: {
    setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.selectedBooking = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: BookingStatus }>) => {
      const booking = state.bookings.find((b) => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
    },
    checkInGuest: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) {
        booking.status = 'checked-in';
      }
    },
    checkOutGuest: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) {
        booking.status = 'checked-out';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      });
  },
});

export const {
  setSelectedBooking,
  addBooking,
  updateBookingStatus,
  cancelBooking,
  checkInGuest,
  checkOutGuest,
} = bookingsSlice.actions;
export default bookingsSlice.reducer;
