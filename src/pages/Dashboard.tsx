
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ParkingStatus from '@/components/dashboard/ParkingStatus';
import ReservationModal from '@/components/dashboard/ReservationModal';

const Dashboard = () => {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState('');
  
  const handleOpenReservationModal = (spotId: string) => {
    setSelectedSpotId(spotId);
    setIsReservationModalOpen(true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Parking Dashboard</h1>
            <p className="text-guardian-gray">Monitor and manage parking spots in real-time</p>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content - Parking Status */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <ParkingStatus />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-guardian-darkGray mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a 
                    href="/garage" 
                    className="flex items-center p-3 rounded-lg bg-guardian-blue/10 text-guardian-blue hover:bg-guardian-blue/20 transition-colors"
                  >
                    <span>Access Garage</span>
                  </a>
                  <button 
                    className="flex items-center w-full p-3 rounded-lg bg-guardian-lightGray text-guardian-darkGray hover:bg-gray-200 transition-colors"
                  >
                    <span>View History</span>
                  </button>
                  <button 
                    className="flex items-center w-full p-3 rounded-lg bg-guardian-lightGray text-guardian-darkGray hover:bg-gray-200 transition-colors"
                  >
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>
              
              {/* User Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-guardian-darkGray mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "Accessed garage", time: "Today, 9:30 AM" },
                    { action: "Reserved spot A3", time: "Yesterday, 5:15 PM" },
                    { action: "Updated profile", time: "3 days ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <span className="text-guardian-darkGray">{activity.action}</span>
                      <span className="text-sm text-guardian-gray">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Usage Statistics */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-guardian-darkGray mb-4">Usage Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-guardian-gray">Weekly Usage</span>
                      <span className="text-sm font-medium text-guardian-darkGray">65%</span>
                    </div>
                    <div className="w-full h-2 bg-guardian-lightGray rounded-full overflow-hidden">
                      <div className="h-full bg-guardian-blue rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-guardian-gray">Peak Hours</span>
                      <span className="text-sm font-medium text-guardian-darkGray">8-10 AM</span>
                    </div>
                    <div className="w-full h-2 bg-guardian-lightGray rounded-full overflow-hidden">
                      <div className="h-full bg-guardian-green rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-guardian-gray">Reservations</span>
                      <span className="text-sm font-medium text-guardian-darkGray">42%</span>
                    </div>
                    <div className="w-full h-2 bg-guardian-lightGray rounded-full overflow-hidden">
                      <div className="h-full bg-guardian-yellow rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Reservation Modal */}
      <ReservationModal 
        spotId={selectedSpotId}
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onConfirm={() => {}}
      />
    </motion.div>
  );
};

export default Dashboard;
