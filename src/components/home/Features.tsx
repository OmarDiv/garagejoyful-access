
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Smartphone, BarChart3 } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const [activeStep, setActiveStep] = useState(0);
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  const features = [
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      description: "Advanced authentication ensures only authorized users can access the garage."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Access your garage from anywhere with our intuitive mobile app."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track usage patterns and space utilization with comprehensive analytics."
    }
  ];
  
  // Updated steps according to user request
  const steps = [
    "View available parking spots in real-time",
    "Reserve your spot with a single click",
    "Enter your details for secure access",
    "Enter your license plate number",
    "Welcome to our Peaceful Garage"
  ];
  
  return (
    <section ref={ref} className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-2xl font-semibold text-guardian-darkGray">
            How it Works
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-3">
                {steps.map((step, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start cursor-pointer transition-all duration-200 ${activeStep === i ? 'opacity-100' : 'opacity-70'}`}
                    onClick={() => setActiveStep(i)}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium mr-3 ${
                      activeStep === i 
                        ? 'bg-guardian-blue text-white' 
                        : 'bg-guardian-blue/10 text-guardian-blue'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-guardian-darkGray pt-1">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg flex items-center justify-center p-4">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mb-3 text-4xl">
                  {activeStep === 0 && "🔍"}
                  {activeStep === 1 && "📅"}
                  {activeStep === 2 && "🔐"}
                  {activeStep === 3 && "🚗"}
                  {activeStep === 4 && "✅"}
                </div>
                <p className="text-sm text-guardian-gray">
                  {activeStep === 0 && "Our real-time system shows available parking spots instantly."}
                  {activeStep === 1 && "Reserve your preferred spot with our easy-to-use interface."}
                  {activeStep === 2 && "Verify your identity for secure and authorized access."}
                  {activeStep === 3 && "Enter your license plate number for quick identification."}
                  {activeStep === 4 && "Enjoy the convenience of guaranteed parking without hassle."}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
