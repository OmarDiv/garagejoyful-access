
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalContainer from './ModalContainer';
import ReservationForm from './ReservationForm';
import SuccessMessage from './SuccessMessage';

interface ReservationModalProps {
  spotId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: any) => void;
}

const ReservationModal = ({ spotId, isOpen, onClose, onConfirm }: ReservationModalProps) => {
  const navigate = useNavigate();
  
  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleFormSubmit = (formData: any) => {
    // Call the parent handler with form data
    onConfirm(formData);
    
    // Show success message
    setIsSuccess(true);
    
    // Reset form after 3 seconds and redirect to reservations page
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      navigate('/reservations'); // Changed from '/garage' to '/reservations'
    }, 3000);
  };
  
  return (
    <ModalContainer 
      isOpen={isOpen} 
      onClose={onClose}
      preventBackdropClose={isSuccess}
      showCloseButton={!isSuccess}
    >
      {!isSuccess ? (
        <ReservationForm 
          spotId={spotId} 
          onSubmit={handleFormSubmit} 
        />
      ) : (
        <SuccessMessage spotId={spotId} />
      )}
    </ModalContainer>
  );
};

export default ReservationModal;
