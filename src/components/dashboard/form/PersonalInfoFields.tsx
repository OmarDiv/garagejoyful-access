
import { User, Mail, Phone } from 'lucide-react';

interface PersonalInfoFieldsProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

const PersonalInfoFields = ({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone
}: PersonalInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-guardian-darkGray mb-1">
          Full Name <span className="text-guardian-red">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
            <User size={16} />
          </span>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-guardian-darkGray mb-1">
          Email Address <span className="text-guardian-red">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
            <Mail size={16} />
          </span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-guardian-darkGray mb-1">
          Phone Number
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
            <Phone size={16} />
          </span>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFields;
