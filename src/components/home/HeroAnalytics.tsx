
import { Users, Clock, Car, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiteAnalytics } from '@/components/reservations/types';

interface HeroAnalyticsProps {
  analytics: SiteAnalytics;
  isInView: boolean;
}

const HeroAnalytics = ({ analytics, isInView }: HeroAnalyticsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
    >
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <Users className="w-8 h-8 text-indigo-600 mb-2" />
        <div className="text-2xl font-bold text-guardian-darkGray">{analytics.totalVisitors.toLocaleString()}</div>
        <div className="text-sm text-guardian-gray">Total Visitors</div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <Clock className="w-8 h-8 text-green-600 mb-2" />
        <div className="text-2xl font-bold text-guardian-darkGray">{analytics.activeUsers}</div>
        <div className="text-sm text-guardian-gray">Active Users</div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <Car className="w-8 h-8 text-purple-600 mb-2" />
        <div className="text-2xl font-bold text-guardian-darkGray">{analytics.totalReservations.toLocaleString()}</div>
        <div className="text-sm text-guardian-gray">Total Bookings</div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <ThumbsUp className="w-8 h-8 text-blue-600 mb-2" />
        <div className="text-2xl font-bold text-guardian-darkGray">{analytics.satisfactionRate}%</div>
        <div className="text-sm text-guardian-gray">Satisfaction Rate</div>
      </div>
    </motion.div>
  );
};

export default HeroAnalytics;
