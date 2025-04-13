
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CheckSquare, History, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Update scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Parking', path: '/dashboard' },
    ...(isAuthenticated ? [
      { name: 'Garage Access', path: '/garage' },
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
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-guardian-darkGray"
          >
            <CheckSquare className="h-8 w-8 text-indigo-600" />
            <span className="font-semibold text-xl tracking-tight">Rakna</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-all-300 hover:text-indigo-600 ${
                  isActive(link.path)
                    ? 'text-indigo-600 font-medium'
                    : 'text-guardian-darkGray'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-guardian-darkGray">
                  <User size={18} className="inline-block mr-1" />
                  <span className="hidden lg:inline">{user?.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all-300"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-1.5 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all-300"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-guardian-darkGray" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  ? 'bg-indigo-100 text-indigo-600 font-medium'
                  : 'text-guardian-darkGray hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Auth Button */}
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 text-guardian-darkGray">
                <User size={18} className="inline-block mr-2" />
                <span>{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-1.5 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all-300 mt-2"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1.5 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all-300 mt-2"
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
