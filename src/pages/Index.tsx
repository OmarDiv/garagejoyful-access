
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Regular User",
      quote: "Rakna has made parking so much easier. I can reserve my spot in advance and never worry about finding a place to park.",
      rating: 5
    },
    {
      name: "Sarah Williams",
      role: "Property Manager",
      quote: "Managing our building's garage has never been easier. The real-time dashboard gives me complete visibility into parking usage.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      quote: "The security features are excellent. I feel confident that only authorized users can access our company's garage.",
      rating: 4
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    let intervalId;
    
    if (autoplay) {
      intervalId = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
    
    return () => clearInterval(intervalId);
  }, [autoplay, currentTestimonial]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold text-guardian-darkGray mb-4">
                Trusted by Drivers Everywhere
              </h2>
              <p className="text-lg text-guardian-gray">
                See what our users say about Rakna
              </p>
            </div>
            
            <div className="relative max-w-3xl mx-auto">
              <div 
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10"
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
              >
                <button 
                  onClick={prevTestimonial}
                  className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-guardian-darkGray hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              
              <div 
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
              >
                <button 
                  onClick={nextTestimonial}
                  className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-guardian-darkGray hover:text-indigo-600 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="overflow-hidden rounded-xl py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative"
                  >
                    <div className="mb-6 text-6xl text-indigo-300 font-serif">"</div>
                    <p className="text-guardian-darkGray mb-6 text-lg italic">
                      {testimonials[currentTestimonial].quote}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-medium">
                          {testimonials[currentTestimonial].name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-guardian-darkGray">{testimonials[currentTestimonial].name}</h4>
                          <p className="text-sm text-guardian-gray">{testimonials[currentTestimonial].role}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < testimonials[currentTestimonial].rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index);
                      setAutoplay(false);
                    }}
                    onMouseEnter={() => setAutoplay(false)}
                    onMouseLeave={() => setAutoplay(true)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'w-8 bg-indigo-600' : 'w-2 bg-indigo-200'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Parking Experience?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have simplified their garage access.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth?mode=register">
                  <Button
                    className="px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors"
                  >
                    Create Your Account
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    className="px-8 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                  >
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
