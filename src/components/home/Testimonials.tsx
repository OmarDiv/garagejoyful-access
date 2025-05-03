
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
}

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Regular User",
      quote: "Rakna has made parking so much easier. I can reserve my spot in advance and never worry about finding a place to park.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Sarah Williams",
      role: "Property Manager",
      quote: "Managing our building's garage has never been easier. The real-time dashboard gives me complete visibility into parking usage.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      quote: "The security features are excellent. I feel confident that only authorized users can access our company's garage.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
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
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-r from-guardian-purple/10 to-guardian-magenta/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-guardian-lightPurple/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 10,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-guardian-magenta/10 text-guardian-magenta text-sm font-medium mb-3">
            Customer Experiences
          </span>
          <h2 className="text-3xl font-display font-semibold text-guardian-darkGray mb-4">
            What Our Users Say
          </h2>
          <p className="text-guardian-gray">
            Discover how Rakna is transforming the parking experience
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <Carousel 
            opts={{
              align: "center",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-guardian-lightGray/50 relative"
                    >
                      <Quote className="absolute top-6 right-6 w-12 h-12 text-guardian-lightPurple opacity-30" />
                      
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-guardian-purple to-guardian-magenta p-0.5">
                            <div className="h-full w-full rounded-full overflow-hidden">
                              {testimonial.image ? (
                                <img 
                                  src={testimonial.image} 
                                  alt={testimonial.name} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-guardian-lightPurple flex items-center justify-center text-white text-xl font-bold">
                                  {testimonial.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-guardian-darkGray">{testimonial.name}</h3>
                          <p className="text-sm text-guardian-gray mb-1">{testimonial.role}</p>
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-guardian-darkGray mt-4 text-lg italic">"{testimonial.quote}"</p>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-white shadow-md hover:bg-guardian-lightPurple/20 hover:text-guardian-purple" />
              <CarouselNext className="-right-12 bg-white shadow-md hover:bg-guardian-lightPurple/20 hover:text-guardian-purple" />
            </div>
          </Carousel>
          
          <div className="flex justify-center mt-8 space-x-2">
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
                  currentTestimonial === index ? 'w-8 bg-guardian-magenta' : 'w-2 bg-guardian-magenta/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
