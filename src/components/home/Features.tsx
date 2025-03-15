
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
      description: "Our system uses advanced authentication protocols to ensure only authorized users can access the garage."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Access your garage from anywhere with our intuitive mobile application."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track usage patterns, popular parking times, and space utilization with our comprehensive analytics."
    }
  ];
  
  const steps = [
    "Enter your license plate number",
    "View available parking spots in real-time",
    "Reserve your spot with a single click",
    "Enter your details for secure access",
    "Park with peace of mind"
  ];
  
  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-semibold text-guardian-darkGray mb-4">
            Designed for Modern Convenience
          </h2>
          <p className="text-lg text-guardian-gray">
            Rakna combines cutting-edge technology with thoughtful design
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-xl bg-guardian-blue/10 flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-guardian-blue" />
              </div>
              <h3 className="text-xl font-medium text-guardian-darkGray mb-3">{feature.title}</h3>
              <p className="text-guardian-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold text-guardian-darkGray mb-6">How it Works</h3>
              <ul className="space-y-4">
                {steps.map((step, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start cursor-pointer transition-all duration-300 ${activeStep === i ? 'scale-105' : 'opacity-70'}`}
                    onClick={() => setActiveStep(i)}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium mr-4 transition-colors ${
                      activeStep === i 
                        ? 'border-guardian-blue text-white bg-guardian-blue' 
                        : 'border-guardian-blue/30 text-guardian-blue'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-guardian-darkGray pt-1">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3 rounded-xl bg-blue-50 h-80 flex items-center justify-center mt-6 md:mt-0">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center p-6"
              >
                <div className="mb-4 text-5xl text-guardian-blue">
                  {activeStep === 0 && "🚗"}
                  {activeStep === 1 && "🔍"}
                  {activeStep === 2 && "📅"}
                  {activeStep === 3 && "🔐"}
                  {activeStep === 4 && "✅"}
                </div>
                <p className="text-guardian-darkGray text-lg font-medium">
                  Step {activeStep + 1}: {steps[activeStep]}
                </p>
                <p className="text-guardian-gray mt-4">
                  {activeStep === 0 && "Enter your license plate number for quick identification."}
                  {activeStep === 1 && "Our real-time system shows you available parking spots instantly."}
                  {activeStep === 2 && "Reserve your preferred spot with our easy-to-use interface."}
                  {activeStep === 3 && "Verify your identity for secure and authorized access."}
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
