
import { ReactNode } from 'react';

interface FormAlertProps {
  icon: ReactNode;
  message: string;
  className?: string;
}

const FormAlert = ({ icon, message, className = "bg-blue-50 text-guardian-blue" }: FormAlertProps) => {
  return (
    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${className}`}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default FormAlert;
