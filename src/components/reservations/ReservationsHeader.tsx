
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, Car } from 'lucide-react';

const ReservationsHeader = () => {
  const { user } = useAuth();
  
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Your Reservation History</h1>
        <p className="text-guardian-gray">
          {user?.name ? `Welcome back, ${user.name}!` : 'View and manage your parking reservations'}
        </p>
      </div>
      
      {user && (
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-medium text-guardian-darkGray">{user.name}'s Account</h2>
              <p className="text-guardian-gray">{user.email}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-blue-50 rounded-lg p-3 flex items-center"
              >
                <Calendar className="text-indigo-600 mr-2" size={18} />
                <div>
                  <div className="text-xs text-guardian-gray">Next Reservation</div>
                  <div className="text-sm font-medium">Apr 18, 2025</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-green-50 rounded-lg p-3 flex items-center"
              >
                <Clock className="text-green-600 mr-2" size={18} />
                <div>
                  <div className="text-xs text-guardian-gray">Member Since</div>
                  <div className="text-sm font-medium">January 2025</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-purple-50 rounded-lg p-3 flex items-center"
              >
                <Car className="text-purple-600 mr-2" size={18} />
                <div>
                  <div className="text-xs text-guardian-gray">Total Bookings</div>
                  <div className="text-sm font-medium">5 reservations</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReservationsHeader;
