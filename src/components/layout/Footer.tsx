
import { Link } from 'react-router-dom';
import { Car, Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-guardian-lightGray py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-guardian-darkGray mb-4">
              <Car className="h-6 w-6" />
              <span className="font-semibold text-lg">GarageGuardian</span>
            </Link>
            <p className="text-guardian-gray text-sm mt-4 max-w-xs">
              A smart and friendly garage access system that makes parking hassle-free and secure.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Garage Access', path: '/garage' },
                { name: 'About', path: '/about' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-guardian-gray hover:text-guardian-blue transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms of Service', path: '#' },
                { name: 'Cookie Policy', path: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-guardian-gray hover:text-guardian-blue transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Github, label: 'GitHub' },
                { icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-guardian-gray hover:text-guardian-blue transition-colors duration-200"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-guardian-gray text-sm">
              Have questions? <br />
              <a href="mailto:support@garagegarage.com" className="text-guardian-blue hover:underline">
                support@garageguardian.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-guardian-gray text-sm">
            &copy; {currentYear} GarageGuardian. All rights reserved.
          </p>
          <p className="text-guardian-gray text-sm mt-4 md:mt-0">
            Designed with care for an optimal user experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
