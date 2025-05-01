
import { LogIn, UserPlus } from 'lucide-react';

type AuthMode = 'login' | 'register';

interface AuthFormTabsProps {
  activeMode: AuthMode;
  onChangeMode: (mode: AuthMode) => void;
}

const AuthFormTabs = ({ activeMode, onChangeMode }: AuthFormTabsProps) => {
  return (
    <div className="flex rounded-lg p-1 bg-guardian-lightGray mb-8">
      <button
        onClick={() => onChangeMode('login')}
        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex justify-center items-center gap-1.5 ${
          activeMode === 'login'
            ? 'bg-white shadow-sm text-guardian-darkGray'
            : 'text-guardian-gray hover:text-guardian-darkGray'
        }`}
      >
        <LogIn size={16} />
        <span>Sign In</span>
      </button>
      <button
        onClick={() => onChangeMode('register')}
        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex justify-center items-center gap-1.5 ${
          activeMode === 'register'
            ? 'bg-white shadow-sm text-guardian-darkGray'
            : 'text-guardian-gray hover:text-guardian-darkGray'
        }`}
      >
        <UserPlus size={16} />
        <span>Register</span>
      </button>
    </div>
  );
};

export default AuthFormTabs;
