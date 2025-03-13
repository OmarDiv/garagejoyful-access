
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
  
  const handleConfirmReservation = () => {
    // Store reservation data in sessionStorage
    // This is a simplified approach - in a real app, you would store more data
    const reservationData = {
      spotId: selectedSpotId,
      timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('reservationSpot', JSON.stringify(reservationData));
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
            <p className="text-guardian-gray">Find and reserve available parking spots</p>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content - Parking Status */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <ParkingStatus onSelectSpot={handleOpenReservationModal} />
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
                    <span>View Map</span>
                  </button>
                  <button 
                    className="flex items-center w-full p-3 rounded-lg bg-guardian-lightGray text-guardian-darkGray hover:bg-gray-200 transition-colors"
                  >
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>
              
              {/* Parking Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-guardian-darkGray mb-4">Parking Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-guardian-gray">Total Spaces</span>
                      <span className="text-sm font-medium text-guardian-darkGray">24</span>
                    </div>
                    <div className="w-full h-2 bg-guardian-lightGray rounded-full overflow-hidden">
                      <div className="h-full bg-guardian-blue rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-guardian-gray">Available Now</span>
                      <span className="text-sm font-medium text-guardian-darkGray">9</span>
                    </div>
                    <div className="w-full h-2 bg-guardian-lightGray rounded-full overflow-hidden">
                      <div className="h-full bg-guardian-green rounded-full" style={{ width: '38%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-guardian-gray">Occupied</span>
                      <span className="text-sm font-medium text-guardian-darkGray">10</span>
                    </div>
                    <div className="w-full h-2 bg-guardian-lightGray rounded-full overflow-hidden">
                      <div className="h-full bg-guardian-red rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-guardian-gray">Reserved</span>
                      <span className="text-sm font-medium text-guardian-darkGray">5</span>
                    </div>
                    <div className="w-full h-2 bg-guardian-lightGray rounded-full overflow-hidden">
                      <div className="h-full bg-guardian-yellow rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hours of Operation */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-guardian-darkGray mb-4">Hours of Operation</h3>
                <ul className="space-y-2 text-guardian-gray">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium text-guardian-darkGray">6:00 AM - 11:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium text-guardian-darkGray">8:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium text-guardian-darkGray">10:00 AM - 8:00 PM</span>
                  </li>
                </ul>
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
        onConfirm={handleConfirmReservation}
      />
    </motion.div>
  );
};

export default Dashboard;
