
import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
  showPassword: boolean;
  toggleVisibility: () => void;
}

const PasswordToggle = ({ showPassword, toggleVisibility }: PasswordToggleProps) => {
  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className="text-guardian-gray"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
};

export default PasswordToggle;
