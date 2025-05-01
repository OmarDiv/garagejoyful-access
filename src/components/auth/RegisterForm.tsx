
import { useState } from 'react';
import { ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormField from './FormField';
import PasswordToggle from './PasswordToggle';

interface RegisterFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChangeMode: () => void;
}

const RegisterForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isSubmitting,
  onSubmit,
  onChangeMode
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FormField
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
        label="Full Name"
        required
        animate
      />
      
      <FormField
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        label="Email Address"
        required
      />
      
      <FormField
        id="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        label="Password"
        required
        rightElement={
          <PasswordToggle 
            showPassword={showPassword} 
            toggleVisibility={() => setShowPassword(!showPassword)} 
          />
        }
      />
      
      <FormField
        id="confirmPassword"
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        label="Confirm Password"
        required
        animate
      />
      
      <Button 
        type="submit" 
        className="w-full btn-hover-effect" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Create Account
            <ArrowRight size={18} />
          </span>
        )}
      </Button>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-center text-guardian-gray">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onChangeMode}
            className="text-guardian-blue hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
