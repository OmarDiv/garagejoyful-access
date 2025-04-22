
import { Car } from 'lucide-react';
import { commonCarTypes } from './carTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleInfoFieldsProps {
  carPlate: string;
  setCarPlate: (value: string) => void;
  carModel: string;
  setCarModel: (value: string) => void;
}

const VehicleInfoFields = ({
  carPlate,
  setCarPlate,
  carModel,
  setCarModel,
}: VehicleInfoFieldsProps) => {
  return (
    <div className="space-y-4">
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
          Car Type
        </label>
        <Select
          value={carModel}
          onValueChange={setCarModel}
        >
          <SelectTrigger id="carModel" className="w-full bg-white">
            <SelectValue placeholder="Select car type or enter custom" />
          </SelectTrigger>
          <SelectContent>
            {commonCarTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {carModel === 'Other' && (
          <input
            type="text"
            value={carModel === 'Other' ? '' : carModel}
            onChange={(e) => setCarModel(e.target.value)}
            placeholder="Enter custom car type"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
          />
        )}
      </div>
    </div>
  );
};

export default VehicleInfoFields;
