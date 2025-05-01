
import { motion } from 'framer-motion';
import { fadeVariants } from './variants';

interface FormFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  animate?: boolean;
  rightElement?: React.ReactNode;
}

const FormField = ({ 
  id, 
  type, 
  value, 
  onChange, 
  placeholder, 
  label, 
  required = false,
  animate = false,
  rightElement
}: FormFieldProps) => {
  const Field = (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-guardian-darkGray mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent pr-10"
          required={required}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-guardian-gray">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );

  return animate ? (
    <motion.div variants={fadeVariants}>
      {Field}
    </motion.div>
  ) : Field;
};

export default FormField;
