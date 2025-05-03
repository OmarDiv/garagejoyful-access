
import { useState } from 'react';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth';
import VehicleInfoFields from './form/VehicleInfoFields';
import FormHeader from './form/FormHeader';
import FormAlert from './form/FormAlert';
import FormFooter from './form/FormFooter';

interface ReservationFormProps {
  spotId: string;
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
  carPlate: string;
  carModel: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

const ReservationForm = ({ spotId, onSubmit }: ReservationFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Form states - simplified to just car info
  const [carPlate, setCarPlate] = useState('');
  const [carModel, setCarModel] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!carPlate.trim() || !carModel.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Collect form data and add user info from auth
    const formData = {
      carPlate: carPlate.trim(),
      carModel: carModel.trim(),
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    };
    
    // Call the parent handler with form data
    onSubmit(formData);
  };
  
  return (
    <>
      <FormHeader spotId={spotId} />
      
      <div className="p-6">
        <FormAlert 
          icon={<Car size={20} />} 
          message="Please provide your vehicle details to complete the reservation" 
        />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Only Car Information */}
          <VehicleInfoFields
            carPlate={carPlate}
            setCarPlate={setCarPlate}
            carModel={carModel}
            setCarModel={setCarModel}
          />
          
          <Button type="submit" className="w-full btn-hover-effect">
            Confirm Reservation
          </Button>
        </form>
        
        <FormFooter />
      </div>
    </>
  );
};

export default ReservationForm;
