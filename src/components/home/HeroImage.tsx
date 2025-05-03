
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
          whileHover={{ scale: 1.03, rotate: -1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1589634749000-1de0a4bdaf95?q=80&w=2073&auto=format&fit=crop" 
            alt="Parking garage" 
            className="w-full h-auto rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="text-lg font-semibold">Smart Parking System</div>
            <div className="text-sm opacity-90">Advanced technology for a seamless experience</div>
          </div>
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
            className="absolute top-0 -left-12 -rotate-6 glass-morphism p-4 rounded-lg shadow-lg z-20"
          >
            <div className="text-sm font-medium text-guardian-purple">Available Now</div>
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
            className="absolute -bottom-8 -right-8 rotate-3 glass-morphism p-4 rounded-lg shadow-lg z-20"
          >
            <div className="text-sm font-medium text-guardian-magenta">Easy Access</div>
            <div className="text-xs text-guardian-gray mt-1">
              Scan QR code to enter
            </div>
          </motion.div>
        )}
        
        {/* Add floating decoration elements */}
        <motion.div
          className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-300 to-guardian-magenta/40 blur-md"
          animate={{ y: [-5, 5, -5], opacity: [0.7, 0.9, 0.7] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-guardian-purple/30 to-blue-300/30 blur-md"
          animate={{ y: [5, -5, 5], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default HeroImage;
