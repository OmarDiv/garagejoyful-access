
import { useState } from 'react';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoFields from './form/PersonalInfoFields';
import VehicleInfoFields from './form/VehicleInfoFields';
import FormHeader from './form/FormHeader';
import FormAlert from './form/FormAlert';
import FormFooter from './form/FormFooter';

interface ReservationFormProps {
  spotId: string;
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
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
    
    if (!fullName.trim() || !email.trim() || !carPlate.trim() || !carModel.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Collect all form data
    const formData = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      carPlate: carPlate.trim(),
      carModel: carModel.trim(),
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
          message="Please provide your details to complete the reservation" 
        />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <PersonalInfoFields
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
          
          {/* Car Information */}
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
