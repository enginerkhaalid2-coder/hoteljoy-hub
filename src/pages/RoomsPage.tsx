import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, Maximize, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRooms, setFilterType, RoomType } from '@/store/slices/roomsSlice';

const RoomsPage = () => {
  const dispatch = useAppDispatch();
  const { filteredRooms, filterType, loading } = useAppSelector((state) => state.rooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [showFilters, setShowFilters] = useState(false);

  const roomTypes: (RoomType | 'All')[] = ['All', 'Standard', 'Deluxe', 'Suite', 'Penthouse'];

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleFilterType = (type: RoomType | 'All') => {
    dispatch(setFilterType(type));
  };

  const displayedRooms = filteredRooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  const roomImages: Record<string, string> = {
    Standard: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    Deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    Suite: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    Penthouse: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Discover our collection of beautifully designed rooms and suites, 
              each offering unique amenities and breathtaking views.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-30 bg-background border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Room Type Tabs */}
            <div className="flex flex-wrap gap-2">
              {roomTypes.map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterType(type)}
                  className={filterType === type ? 'gold-gradient text-primary-foreground' : ''}
                >
                  {type === 'All' ? 'All Types' : type}
                </Button>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-secondary text-secondary-foreground' : ''}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pt-6"
            >
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <div className="flex-1 max-w-sm">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1500}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 1500]);
                    dispatch(setFilterType('All'));
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{displayedRooms.length}</span> rooms
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-64 rounded-t-xl" />
                  <div className="bg-card p-6 rounded-b-xl">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayedRooms.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No rooms found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 1500]);
                  dispatch(setFilterType('All'));
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden group hover:shadow-elegant transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={roomImages[room.type]}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                          {room.type}
                        </span>
                        {room.featured && (
                          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
                            <Star className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>
                      {!room.available && (
                        <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                          <span className="text-background font-semibold text-lg">Not Available</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        {room.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {room.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {room.capacity} Guests
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-4 h-4" /> {room.size} m²
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-bold text-secondary">${room.price}</span>
                          <span className="text-muted-foreground text-sm"> / night</span>
                        </div>
                        <Link to={`/rooms/${room.id}`}>
                          <Button 
                            className="gold-gradient text-primary-foreground hover:opacity-90"
                            disabled={!room.available}
                          >
                            {room.available ? 'Book Now' : 'Unavailable'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RoomsPage;
