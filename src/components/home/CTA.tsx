
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-500 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Parking Experience?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of drivers who have simplified their garage access with Rakna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/garage">
              <Button
                className="px-8 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors"
              >
                Access Garage Now
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
  );
};

export default CTA;
