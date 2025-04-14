
import { ReactNode } from 'react';

interface FormHeaderProps {
  spotId: string;
  icon?: ReactNode;
}

const FormHeader = ({ spotId, icon }: FormHeaderProps) => {
  return (
    <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-100">
      <h3 className="text-xl font-semibold text-guardian-darkGray">Reserve Parking Spot {spotId}</h3>
    </div>
  );
};

export default FormHeader;
