import { motion } from 'framer-motion';
import { Target, Award, Shield, Users, Heart, Zap, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide exceptional hospitality experiences that exceed expectations and create lasting memories for every guest.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from the quality of our rooms to the warmth of our staff.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your safety and privacy are our top priorities. We implement the highest standards of security and data protection.',
    },
    {
      icon: Heart,
      title: 'Guest-Centric',
      description: 'Every decision we make is guided by our commitment to enhancing your comfort and satisfaction.',
    },
  ];

  const benefits = [
    { icon: Zap, text: 'Efficiency - Streamlined operations for faster service' },
    { icon: CheckCircle, text: 'Accuracy - Precise booking and inventory management' },
    { icon: Users, text: 'User-Friendly - Intuitive interface for all users' },
    { icon: Shield, text: 'Secure - Enterprise-grade security measures' },
    { icon: Clock, text: '24/7 Support - Round-the-clock assistance' },
    { icon: Award, text: 'Quality - Premium service standards' },
  ];

  const stats = [
    { number: '15+', label: 'Years of Excellence' },
    { number: '50K+', label: 'Happy Guests' },
    { number: '200+', label: 'Luxury Rooms' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About Our Hotel Management System
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Our Hotel Management System is a modern digital solution designed to simplify and automate hotel operations. 
              It helps hotels manage rooms, bookings, guests, and daily activities efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg mx-auto text-center"
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                The system is built with a user-friendly interface, real-time availability tracking, 
                and role-based access for Guests, Receptionists, and Admins. Our mission is to improve 
                hotel productivity, enhance guest experience, and provide accurate booking and management 
                tools through modern technology.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At Grand Stay Hotel, we believe in combining timeless elegance with cutting-edge technology 
                to deliver an unparalleled hospitality experience. Our team of dedicated professionals 
                works tirelessly to ensure every guest feels valued and every stay is memorable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-secondary mb-2">{stat.number}</p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-4">
              Why Choose Our System
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-elegant transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">
              Key Benefits
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-4">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-card"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-foreground font-medium">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-4">
              Meet the People Behind Grand Stay
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'James Anderson', role: 'General Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
              { name: 'Sarah Mitchell', role: 'Operations Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { name: 'Michael Chen', role: 'Guest Relations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden border-4 border-secondary">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
