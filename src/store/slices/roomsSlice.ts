import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Penthouse';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
  description: string;
  available: boolean;
  featured?: boolean;
}

interface RoomsState {
  rooms: Room[];
  selectedRoom: Room | null;
  filteredRooms: Room[];
  filterType: RoomType | 'All';
  loading: boolean;
  error: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  selectedRoom: null,
  filteredRooms: [],
  filterType: 'All',
  loading: false,
  error: null,
};

// Mock rooms data
const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Classic Comfort Room',
    type: 'Standard',
    price: 120,
    capacity: 2,
    size: 25,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service'],
    images: ['/placeholder.svg'],
    description: 'A cozy and comfortable room perfect for solo travelers or couples. Enjoy modern amenities and a peaceful night\'s rest.',
    available: true,
  },
  {
    id: '2',
    name: 'Superior Standard Room',
    type: 'Standard',
    price: 140,
    capacity: 2,
    size: 28,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Safe', 'Coffee Maker'],
    images: ['/placeholder.svg'],
    description: 'Upgraded standard room with additional space and premium bedding for enhanced comfort.',
    available: true,
  },
  {
    id: '3',
    name: 'Deluxe City View',
    type: 'Deluxe',
    price: 220,
    capacity: 2,
    size: 35,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'City View', 'Bathrobe', 'Premium Toiletries'],
    images: ['/placeholder.svg'],
    description: 'Spacious deluxe room featuring stunning city views and premium furnishings. Perfect for business travelers.',
    available: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Deluxe Garden Room',
    type: 'Deluxe',
    price: 200,
    capacity: 3,
    size: 38,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Garden View', 'Balcony', 'Seating Area'],
    images: ['/placeholder.svg'],
    description: 'Elegant room overlooking our beautiful gardens with a private balcony for relaxation.',
    available: true,
  },
  {
    id: '5',
    name: 'Executive Suite',
    type: 'Suite',
    price: 380,
    capacity: 3,
    size: 55,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Living Room', 'Kitchenette', 'Jacuzzi', 'Butler Service'],
    images: ['/placeholder.svg'],
    description: 'Luxurious suite with separate living area and stunning panoramic views. Experience ultimate comfort and sophistication.',
    available: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Family Suite',
    type: 'Suite',
    price: 420,
    capacity: 4,
    size: 65,
    amenities: ['Free WiFi', 'Air Conditioning', '2 TVs', 'Mini Bar', '2 Bedrooms', 'Living Room', 'Kids Amenities', 'Room Service'],
    images: ['/placeholder.svg'],
    description: 'Spacious two-bedroom suite perfect for families. Features a living area and child-friendly amenities.',
    available: true,
  },
  {
    id: '7',
    name: 'Royal Penthouse',
    type: 'Penthouse',
    price: 850,
    capacity: 4,
    size: 120,
    amenities: ['Free WiFi', 'Air Conditioning', 'Home Theater', 'Full Kitchen', 'Private Terrace', 'Jacuzzi', 'Butler Service', '24/7 Concierge', 'Private Elevator'],
    images: ['/placeholder.svg'],
    description: 'The epitome of luxury living. Our Royal Penthouse offers unparalleled views, private terrace, and exclusive services.',
    available: true,
    featured: true,
  },
  {
    id: '8',
    name: 'Presidential Penthouse',
    type: 'Penthouse',
    price: 1200,
    capacity: 6,
    size: 180,
    amenities: ['Free WiFi', 'Air Conditioning', 'Home Theater', 'Full Kitchen', 'Private Pool', 'Spa Room', 'Butler Service', 'Private Dining', 'Helipad Access'],
    images: ['/placeholder.svg'],
    description: 'Our most exclusive accommodation featuring a private pool, spa, and dedicated staff. The ultimate in luxury hospitality.',
    available: true,
  },
];

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRooms;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload;
    },
    setFilterType: (state, action: PayloadAction<RoomType | 'All'>) => {
      state.filterType = action.payload;
      if (action.payload === 'All') {
        state.filteredRooms = state.rooms;
      } else {
        state.filteredRooms = state.rooms.filter((room) => room.type === action.payload);
      }
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
      if (state.filterType === 'All' || action.payload.type === state.filterType) {
        state.filteredRooms.push(action.payload);
      }
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const index = state.rooms.findIndex((room) => room.id === action.payload.id);
      if (index !== -1) {
        state.rooms[index] = action.payload;
        const filteredIndex = state.filteredRooms.findIndex((room) => room.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredRooms[filteredIndex] = action.payload;
        }
      }
    },
    deleteRoom: (state, action: PayloadAction<string>) => {
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      state.filteredRooms = state.filteredRooms.filter((room) => room.id !== action.payload);
    },
    updateRoomPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const room = state.rooms.find((r) => r.id === action.payload.id);
      if (room) {
        room.price = action.payload.price;
      }
      const filteredRoom = state.filteredRooms.find((r) => r.id === action.payload.id);
      if (filteredRoom) {
        filteredRoom.price = action.payload.price;
      }
    },
    toggleRoomAvailability: (state, action: PayloadAction<string>) => {
      const room = state.rooms.find((r) => r.id === action.payload);
      if (room) {
        room.available = !room.available;
      }
      const filteredRoom = state.filteredRooms.find((r) => r.id === action.payload);
      if (filteredRoom) {
        filteredRoom.available = !filteredRoom.available;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
        state.filteredRooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rooms';
      });
  },
});

export const {
  setSelectedRoom,
  setFilterType,
  addRoom,
  updateRoom,
  deleteRoom,
  updateRoomPrice,
  toggleRoomAvailability,
} = roomsSlice.actions;
export default roomsSlice.reducer;
