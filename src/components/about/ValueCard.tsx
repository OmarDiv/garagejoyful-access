
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 }
        }
      }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300"
    >
      <div className="h-10 w-10 rounded-lg bg-guardian-blue/10 flex items-center justify-center mb-3">
        <Icon className="h-5 w-5 text-guardian-blue" />
      </div>
      <h3 className="text-lg font-medium text-guardian-darkGray mb-2">{title}</h3>
      <p className="text-sm text-guardian-gray">{description}</p>
    </motion.div>
  );
};

export default ValueCard;
