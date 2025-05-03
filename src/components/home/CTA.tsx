
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Car, Clock, CheckSquare } from 'lucide-react';

const CTA = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4">Ready to Transform Your Parking Experience?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied drivers who have simplified their parking experience with our smart garage system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <div className="flex gap-4">
                <Link to="/dashboard">
                  <Button
                    className="px-6 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CheckSquare className="w-5 h-5" />
                    Find Parking
                  </Button>
                </Link>
                <Link to="/reservations">
                  <Button
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                    className="px-6 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <Clock className="w-5 h-5" />
                    Start Parking Smarter
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 transition-colors gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CheckSquare className="w-5 h-5" />
                    Explore Spaces
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Quick Access</h3>
              <p className="text-white/80">Enter and exit the garage seamlessly with your digital access code</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-white/80">Get instant notifications about your parking status</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
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
