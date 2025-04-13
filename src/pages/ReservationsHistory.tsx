
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Car, MapPin } from 'lucide-react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import PageBackground from '@/components/ui/PageBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Types for reservation data
interface Reservation {
  id: string;
  date: string;
  time: string;
  spotId: string;
  status: 'active' | 'completed' | 'cancelled';
  carDetails: {
    make: string;
    model: string;
    licensePlate: string;
  };
}

const ReservationsHistory = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reservations data (simulated)
  useEffect(() => {
    // This would be replaced with an actual API call
    const mockReservations: Reservation[] = [
      {
        id: 'res-1',
        date: '2025-04-14',
        time: '10:00 AM - 12:00 PM',
        spotId: '2',
        status: 'active',
        carDetails: {
          make: 'Toyota',
          model: 'Camry',
          licensePlate: 'ABC-1234'
        }
      },
      {
        id: 'res-2',
        date: '2025-04-10',
        time: '2:00 PM - 4:00 PM',
        spotId: '3',
        status: 'completed',
        carDetails: {
          make: 'Honda',
          model: 'Civic',
          licensePlate: 'XYZ-5678'
        }
      },
      {
        id: 'res-3',
        date: '2025-04-05',
        time: '9:00 AM - 11:00 AM',
        spotId: '1',
        status: 'cancelled',
        carDetails: {
          make: 'Tesla',
          model: 'Model 3',
          licensePlate: 'ELK-9012'
        }
      }
    ];

    setTimeout(() => {
      setReservations(mockReservations);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get reservations by status
  const getReservationsByStatus = (status: 'active' | 'completed' | 'cancelled') => {
    return reservations.filter(res => res.status === status);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
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

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-700';
        case 'completed': return 'bg-blue-100 text-blue-700';
        case 'cancelled': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    return (
      <motion.div variants={itemVariants}>
        <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Parking Spot #{reservation.spotId}</CardTitle>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(reservation.status)}`}>
                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-guardian-gray">
                  <Calendar size={16} className="text-indigo-600" />
                  <span>{reservation.date}</span>
                </div>
                <div className="flex items-center gap-2 text-guardian-gray">
                  <Clock size={16} className="text-indigo-600" />
                  <span>{reservation.time}</span>
                </div>
                <div className="flex items-center gap-2 text-guardian-gray">
                  <MapPin size={16} className="text-indigo-600" />
                  <span>Main Garage, Level 1</span>
                </div>
              </div>
              <div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Car size={16} className="text-indigo-600" />
                    Vehicle Details
                  </h4>
                  <div className="text-sm space-y-1 text-guardian-gray">
                    <p>{reservation.carDetails.make} {reservation.carDetails.model}</p>
                    <p>License: {reservation.carDetails.licensePlate}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {reservation.status === 'active' && (
              <div className="mt-4 flex gap-2 justify-end">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="destructive" size="sm">Cancel</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <PageBackground variant="dashboard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <NavBar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Reservation History</h1>
              <p className="text-guardian-gray">View and manage your parking reservations</p>
            </motion.div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              {isLoading ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-guardian-gray">Loading your reservations...</p>
                </div>
              ) : (
                <>
                  <TabsContent value="all">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {reservations.length > 0 ? (
                        reservations.map(reservation => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-guardian-gray">You don't have any reservations yet.</p>
                          <Button className="mt-4" asChild>
                            <Link to="/dashboard">Find Parking</Link>
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="active">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {getReservationsByStatus('active').length > 0 ? (
                        getReservationsByStatus('active').map(reservation => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-guardian-gray">You don't have any active reservations.</p>
                          <Button className="mt-4" asChild>
                            <Link to="/dashboard">Find Parking</Link>
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="completed">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {getReservationsByStatus('completed').length > 0 ? (
                        getReservationsByStatus('completed').map(reservation => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-guardian-gray">You don't have any completed reservations.</p>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="cancelled">
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {getReservationsByStatus('cancelled').length > 0 ? (
                        getReservationsByStatus('cancelled').map(reservation => (
                          <ReservationCard key={reservation.id} reservation={reservation} />
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-guardian-gray">You don't have any cancelled reservations.</p>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </motion.div>
    </PageBackground>
  );
};

export default ReservationsHistory;
