
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const AuthPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">
              Account Access
            </h1>
            <p className="text-guardian-gray">Sign in or create your account</p>
          </div>
          
          <AuthForm />
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default AuthPage;
