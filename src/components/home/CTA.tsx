
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Car, Clock, CheckSquare, CircleParking } from 'lucide-react';

const CTA = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-guardian-purple to-guardian-magenta z-0"></div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Animated shapes */}
      <motion.div 
        className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"
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
        className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 10,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <CircleParking size={40} className="text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">Ready to Transform Your Parking Experience?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white/90">
            Join thousands of satisfied drivers who have simplified their parking experience with our smart garage system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {isAuthenticated ? (
              <div className="flex gap-4 flex-wrap justify-center">
                <Link to="/dashboard">
                  <Button
                    className="px-8 py-6 bg-white text-guardian-purple rounded-full font-medium hover:bg-purple-50 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300 text-base"
                  >
                    <CheckSquare className="w-5 h-5" />
                    Find Parking
                  </Button>
                </Link>
                <Link to="/reservations">
                  <Button
                    className="px-8 py-6 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300 text-base"
                  >
                    <Car className="w-5 h-5" />
                    My Reservations
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button
                    className="px-8 py-6 bg-white text-guardian-purple rounded-full font-medium hover:bg-purple-50 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300 text-base"
                  >
                    <Clock className="w-5 h-5" />
                    Start Parking Smarter
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    className="px-8 py-6 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300 text-base"
                  >
                    <CheckSquare className="w-5 h-5" />
                    Explore Spaces
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300"
            >
              <div className="bg-white/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <CheckSquare className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Access</h3>
              <p className="text-white/80">Enter and exit the garage seamlessly with your digital access code</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300"
            >
              <div className="bg-white/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Clock className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-white/80">Get instant notifications about your parking status</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300"
            >
              <div className="bg-white/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Car className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-white/80">Our team is always here to help you with any questions</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
