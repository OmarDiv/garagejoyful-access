
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-12 bg-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Parking Experience?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/garage">
              <Button
                className="px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors"
              >
                Access Garage Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
