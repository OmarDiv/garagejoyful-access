
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroContentProps {
  isInView: boolean;
}

const HeroContent = ({ isInView }: HeroContentProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const numbersVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.4
      }
    })
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="order-2 md:order-1"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-guardian-darkGray leading-tight"
      >
        Smart Parking <span className="text-indigo-600">Made Simple</span>
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="mt-6 text-lg text-guardian-gray max-w-lg"
      >
        Find and reserve the perfect parking spot in seconds. 
        No more circling the block or stressing about where to park.
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Link to="/dashboard">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg btn-hover-effect min-w-[160px]">
            Find Parking
          </Button>
        </Link>
        
        <Link to="/auth">
          <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg btn-hover-effect min-w-[160px]">
            Sign In
          </Button>
        </Link>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {[
          { value: "100+", label: "Parking Spots" },
          { value: "24/7", label: "Availability" },
          { value: "1-Click", label: "Reservations" }
        ].map((item, index) => (
          <motion.div 
            key={item.value}
            custom={index}
            variants={numbersVariants}
            className="flex flex-col items-center sm:items-start"
          >
            <motion.div 
              whileHover={{ scale: 1.1, color: "#4f46e5" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-3xl font-bold text-indigo-600"
            >
              {item.value}
            </motion.div>
            <div className="text-sm text-guardian-gray">{item.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
