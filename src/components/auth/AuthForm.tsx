
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth';
import { toast } from 'sonner';
import api from '@/services/api';

// Import refactored components
import AuthFormTabs from './AuthFormTabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { formVariants } from './variants';

type AuthMode = 'login' | 'register';

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const auth = useAuth();
  
  // Get redirect path from location state
  const from = location.state?.from?.pathname || '/dashboard';
  
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Change URL when mode changes
  const changeMode = (newMode: AuthMode) => {
    setMode(newMode);
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (mode === 'register') {
      if (password !== confirmPassword) {
        uiToast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      if (mode === 'login') {
        const result = await api.login(email, password);
        auth.login(result.user);
        toast.success("Logged in successfully");
      } else {
        // In a real app, this would have a register API call
        // For now, we'll just use the login mock
        const result = await api.login(email, password);
        auth.login(result.user);
        toast.success("Account created successfully");
      }
      
      navigate(from);
    } catch (error) {
      console.error('Auth error:', error);
      uiToast({
        title: mode === 'login' ? "Login failed" : "Registration failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <AuthFormTabs activeMode={mode} onChangeMode={changeMode} />
      
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
        
        {mode === 'login' ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onChangeMode={() => changeMode('register')}
          />
        ) : (
          <RegisterForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onChangeMode={() => changeMode('login')}
          />
        )}
      </motion.div>
    </div>
  );
};

export default AuthForm;
