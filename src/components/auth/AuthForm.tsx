
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type AuthMode = 'login' | 'register';

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get mode from URL query parameter, default to login
  const searchParams = new URLSearchParams(location.search);
  const urlMode = searchParams.get('mode');
  const [mode, setMode] = useState<AuthMode>(
    urlMode === 'register' ? 'register' : 'login'
  );
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Change URL when mode changes
  const changeMode = (newMode: AuthMode) => {
    setMode(newMode);
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (mode === 'register') {
      if (password !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: mode === 'login' ? "Logged in successfully" : "Account created successfully",
        description: mode === 'login' 
          ? "Welcome back to GarageGuardian!" 
          : "Your account has been created. Welcome to GarageGuardian!",
      });
      
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };
  
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex rounded-lg p-1 bg-guardian-lightGray mb-8">
        <button
          onClick={() => changeMode('login')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex justify-center items-center gap-1.5 ${
            mode === 'login'
              ? 'bg-white shadow-sm text-guardian-darkGray'
              : 'text-guardian-gray hover:text-guardian-darkGray'
          }`}
        >
          <LogIn size={16} />
          <span>Sign In</span>
        </button>
        <button
          onClick={() => changeMode('register')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all flex justify-center items-center gap-1.5 ${
            mode === 'register'
              ? 'bg-white shadow-sm text-guardian-darkGray'
              : 'text-guardian-gray hover:text-guardian-darkGray'
          }`}
        >
          <UserPlus size={16} />
          <span>Register</span>
        </button>
      </div>
      
      <motion.div
        key={mode}
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-guardian-darkGray mb-6">
          {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <motion.div variants={fadeVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-guardian-darkGray mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                required={mode === 'register'}
              />
            </motion.div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-guardian-darkGray mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-guardian-darkGray mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-guardian-gray"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {mode === 'register' && (
            <motion.div variants={fadeVariants}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-guardian-darkGray mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                required={mode === 'register'}
              />
            </motion.div>
          )}
          
          {mode === 'login' && (
            <div className="text-right">
              <a href="#" className="text-sm text-guardian-blue hover:underline">
                Forgot password?
              </a>
            </div>
          )}
          
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
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} />
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-guardian-gray">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => changeMode(mode === 'login' ? 'register' : 'login')}
              className="text-guardian-blue hover:underline"
            >
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
