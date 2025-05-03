
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, CircleParking, History, LogIn, User, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    toast.success("Successfully signed out");
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Parking', path: '/dashboard' },
    ...(isAuthenticated ? [
      { name: 'Reservations', path: '/reservations', icon: History },
    ] : []),
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-guardian-darkGray"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <CircleParking className="h-8 w-8 text-guardian-purple" />
            </motion.div>
            <span className="font-display text-xl tracking-tight">Rakna</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-all-300 hover:text-guardian-purple ${
                  isActive(link.path)
                    ? 'text-guardian-purple font-medium'
                    : 'text-guardian-darkGray'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 text-guardian-darkGray hover:text-guardian-purple transition-all-300">
                    <Settings size={18} />
                    <span className="hidden lg:inline">Settings</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <User size={16} />
                      <span>{user?.name}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-1.5 text-white bg-guardian-purple px-4 py-2 rounded-lg hover:bg-guardian-deepPurple transition-all-300"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </nav>

          <button 
            className="md:hidden text-guardian-darkGray" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden bg-white w-full shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block py-2 px-4 rounded-lg transition-all-300 ${
                isActive(link.path)
                  ? 'bg-guardian-lightPurple/50 text-guardian-purple font-medium'
                  : 'text-guardian-darkGray hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 text-guardian-darkGray">
                <User size={18} className="inline-block mr-2" />
                <span>{user?.name}</span>
              </div>
              <Link
                to="/settings"
                className="block py-2 px-4 rounded-lg text-guardian-darkGray hover:bg-gray-50"
              >
                <Settings size={18} className="inline-block mr-2" />
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-1.5 text-white bg-guardian-purple px-4 py-2 rounded-lg hover:bg-guardian-deepPurple transition-all-300 mt-2"
              >
                <LogIn size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1.5 text-white bg-guardian-purple px-4 py-2 rounded-lg hover:bg-guardian-deepPurple transition-all-300 mt-2"
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
