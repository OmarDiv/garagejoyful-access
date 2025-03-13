
import { useState } from 'react';
import { Car, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ReservationFormProps {
  spotId: string;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  carPlate: string;
  carModel: string;
}

const ReservationForm = ({ spotId, onSubmit }: ReservationFormProps) => {
  const { toast } = useToast();
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [carModel, setCarModel] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim() || !carPlate.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Collect all form data
    const formData = {
      fullName,
      email,
      phone,
      carPlate,
      carModel
    };
    
    // Call the parent handler with form data
    onSubmit(formData);
  };
  
  return (
    <>
      <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-100">
        <h3 className="text-xl font-semibold text-guardian-darkGray">Reserve Parking Spot {spotId}</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6 p-4 bg-blue-50 rounded-xl flex items-center text-guardian-blue gap-3">
          <Car size={20} />
          <p>Please provide your details to complete the reservation</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            {/* Personal Information */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-guardian-darkGray mb-1">
                Full Name <span className="text-guardian-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                  <User size={16} />
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-guardian-darkGray mb-1">
                Email Address <span className="text-guardian-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-guardian-darkGray mb-1">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                  <Phone size={16} />
                </span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Car Information */}
            <div>
              <label htmlFor="carPlate" className="block text-sm font-medium text-guardian-darkGray mb-1">
                License Plate Number <span className="text-guardian-red">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                  <Car size={16} />
                </span>
                <input
                  id="carPlate"
                  type="text"
                  value={carPlate}
                  onChange={(e) => setCarPlate(e.target.value)}
                  placeholder="Enter your license plate"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="carModel" className="block text-sm font-medium text-guardian-darkGray mb-1">
                Car Model
              </label>
              <input
                id="carModel"
                type="text"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="e.g. Toyota Camry, Honda Civic"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full btn-hover-effect">
            Confirm Reservation
          </Button>
        </form>
        
        <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-guardian-gray text-center">
          <p>Fields marked with <span className="text-guardian-red">*</span> are required</p>
        </div>
      </div>
    </>
  );
};

export default ReservationForm;
