
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const CTA = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="py-16 bg-purple-600 text-white">
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
              <>
                <Link to="/garage">
                  <Button
                    className="px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors"
                  >
                    Access Garage Now
                  </Button>
                </Link>
                <Link to="/reservations">
                  <Button
                    className="px-6 py-2 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors border border-white"
                  >
                    View My Reservations
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button
                    className="px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors"
                  >
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    className="px-6 py-2 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors border border-white"
                  >
                    Explore Parking Options
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
