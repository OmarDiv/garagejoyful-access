
import { Users, Clock, Car, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiteAnalytics } from '@/components/reservations/types';
import { useState } from 'react';

interface HeroAnalyticsProps {
  analytics: SiteAnalytics;
  isInView: boolean;
}

const HeroAnalytics = ({ analytics, isInView }: HeroAnalyticsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const analyticsItems = [
    { 
      icon: Users, 
      value: analytics.totalVisitors.toLocaleString(), 
      label: "Total Visitors",
      color: "text-guardian-purple",
      bgColor: "bg-guardian-purple/10" 
    },
    { 
      icon: Clock, 
      value: analytics.activeUsers, 
      label: "Active Users",
      color: "text-green-600",
      bgColor: "bg-green-100" 
    },
    { 
      icon: Car, 
      value: analytics.totalReservations.toLocaleString(), 
      label: "Total Bookings",
      color: "text-guardian-magenta",
      bgColor: "bg-guardian-magenta/10" 
    },
    { 
      icon: ThumbsUp, 
      value: `${analytics.satisfactionRate}%`, 
      label: "Satisfaction Rate",
      color: "text-blue-600",
      bgColor: "bg-blue-100" 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
    >
      {analyticsItems.map((item, index) => (
        <motion.div 
          key={index}
          className="glass-morphism p-4 rounded-xl shadow-sm card-hover"
          whileHover={{ 
            y: -5,
            transition: { duration: 0.2 }
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <motion.div 
            className={`p-2 rounded-lg inline-block ${item.bgColor} ${item.color} mb-2`}
            animate={hoveredIndex === index ? { 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <item.icon className="w-6 h-6" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
          >
            <div className="text-2xl font-bold text-guardian-darkGray">{item.value}</div>
            <div className="text-sm text-guardian-gray">{item.label}</div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroAnalytics;
