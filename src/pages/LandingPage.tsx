import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Wifi, Car, Utensils, Dumbbell, Sparkles, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRooms } from '@/store/slices/roomsSlice';
import { useEffect } from 'react';

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.rooms);
  const featuredRooms = rooms.filter((room) => room.featured).slice(0, 3);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const amenities = [
    { icon: Wifi, name: 'Free WiFi', desc: 'High-speed internet throughout' },
    { icon: Car, name: 'Free Parking', desc: 'Secure underground parking' },
    { icon: Utensils, name: 'Fine Dining', desc: 'Award-winning restaurant' },
    { icon: Dumbbell, name: 'Fitness Center', desc: '24/7 gym access' },
    { icon: Sparkles, name: 'Spa & Wellness', desc: 'Relaxation therapies' },
    { icon: Star, name: 'Concierge', desc: 'Personalized service' },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Business Traveler',
      content: 'The Executive Suite exceeded all expectations. The attention to detail and impeccable service made my business trip truly memorable.',
      rating: 5,
    },
    {
      name: 'James & Emily Chen',
      role: 'Honeymoon Guests',
      content: 'Our honeymoon at Grand Stay was absolutely magical. The Royal Penthouse with its stunning views created the perfect romantic getaway.',
      rating: 5,
    },
    {
      name: 'Michael Thompson',
      role: 'Frequent Guest',
      content: 'I\'ve stayed at many luxury hotels, but Grand Stay consistently delivers exceptional experiences. The staff remembers my preferences every time.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-navy-light/80 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
            alt="Luxury hotel lobby"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              ★★★★★ Luxury Hotel & Resort
            </span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Experience Luxury<br />
              <span className="text-gold-gradient">Like Never Before</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Discover unparalleled comfort and elegance at Grand Stay Hotel. 
              Where every moment becomes a cherished memory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rooms">
                <Button size="lg" className="gold-gradient text-primary-foreground hover:opacity-90 px-8 h-14 text-lg">
                  Explore Rooms
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 h-14 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-secondary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">
              Accommodations
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-4">
              Featured Rooms & Suites
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover our handpicked selection of premium rooms, each designed to provide 
              the ultimate comfort and luxury experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden group hover:shadow-elegant transition-shadow">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80`}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                      {room.type}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {room.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {room.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-secondary">${room.price}</span>
                        <span className="text-muted-foreground text-sm"> / night</span>
                      </div>
                      <Link to={`/rooms/${room.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/rooms">
              <Button size="lg" className="gold-gradient text-primary-foreground hover:opacity-90">
                View All Rooms
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">
              Hotel Amenities
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-4">
              World-Class Facilities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={amenity.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-card"
                >
                  <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {amenity.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{amenity.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">
              Guest Reviews
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-4">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-card rounded-xl shadow-card relative"
              >
                <Quote className="w-10 h-10 text-secondary/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready for an Unforgettable Stay?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Book your dream room today and experience the luxury that awaits you at Grand Stay Hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rooms">
                <Button size="lg" className="gold-gradient text-primary-foreground hover:opacity-90 px-8 h-14 text-lg">
                  Book Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 h-14 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
