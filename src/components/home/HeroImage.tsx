
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroImageProps {
  isInView: boolean;
  imagesLoaded: boolean;
}

const HeroImage = ({ isInView, imagesLoaded }: HeroImageProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: imagesLoaded && isInView ? 1 : 0, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="order-1 md:order-2 flex justify-center md:justify-end"
    >
      <div className="relative">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut"
          }}
          className="rounded-2xl overflow-hidden shadow-2xl max-w-md relative z-10"
        >
          <img 
            src="https://images.unsplash.com/photo-1589634749000-1de0a4bdaf95?q=80&w=2073&auto=format&fit=crop" 
            alt="Parking garage" 
            className="w-full h-auto"
          />
        </motion.div>
        
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ 
              opacity: imagesLoaded && isInView ? 1 : 0, 
              x: 0,
              rotate: [-6, -4, -6]
            }}
            transition={{ 
              delay: 0.5, 
              duration: 0.5,
              rotate: {
                repeat: Infinity,
                duration: 4
              }
            }}
            className="absolute top-0 -left-12 -rotate-6 bg-white p-4 rounded-lg shadow-lg z-20"
          >
            <div className="text-sm font-medium text-guardian-blue">Available Now</div>
            <div className="flex items-center gap-1 mt-1">
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2
                }}
                className="w-3 h-3 rounded-full bg-green-500"
              ></motion.span>
              <span className="text-xs text-guardian-gray">12 open spots</span>
            </div>
          </motion.div>
        )}
        
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ 
              opacity: imagesLoaded && isInView ? 1 : 0, 
              x: 0,
              rotate: [3, 5, 3]
            }}
            transition={{ 
              delay: 0.7, 
              duration: 0.5,
              rotate: {
                repeat: Infinity,
                duration: 4
              }
            }}
            className="absolute -bottom-8 -right-8 rotate-3 bg-indigo-100 p-4 rounded-lg shadow-lg z-20"
          >
            <div className="text-sm font-medium text-indigo-800">Easy Access</div>
            <div className="text-xs text-guardian-gray mt-1">
              Scan QR code to enter
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default HeroImage;
