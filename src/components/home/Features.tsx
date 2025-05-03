
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Smartphone, BarChart3, CircleParking, Clock, Key } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const [activeStep, setActiveStep] = useState(0);
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  
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

  const stepIcons = [
    <Clock size={24} className="text-guardian-purple" />,
    <CircleParking size={24} className="text-guardian-magenta" />,
    <ShieldCheck size={24} className="text-guardian-deepPurple" />,
    <Key size={24} className="text-green-600" />,
    <Smartphone size={24} className="text-blue-600" />
  ];
  
  return (
    <section ref={ref} className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-guardian-lightPurple text-guardian-purple text-sm font-medium mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl font-display font-semibold text-guardian-darkGray mb-4">
            How it Works
          </h2>
          <p className="text-guardian-gray">
            Our intuitive platform makes parking hassle-free with just a few simple steps
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-guardian-lightGray/50 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:pr-6 border-r-0 md:border-r border-dashed border-guardian-lightGray">
              <ul className="space-y-6">
                {steps.map((step, i) => (
                  <motion.li 
                    key={i} 
                    className={`flex items-start cursor-pointer transition-all duration-200 ${activeStep === i ? 'opacity-100' : 'opacity-70'}`}
                    onClick={() => setActiveStep(i)}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="mr-4 relative">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                        activeStep === i 
                          ? 'bg-guardian-purple text-white shadow-lg shadow-guardian-purple/20' 
                          : 'bg-guardian-lightPurple/30 text-guardian-purple'
                      }`}>
                        {i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`absolute left-1/2 top-10 bottom-0 w-0.5 -translate-x-1/2 ${
                          activeStep > i ? 'bg-guardian-purple' : 'bg-gray-200'
                        }`} style={{ height: '2rem' }}></div>
                      )}
                    </div>
                    <div className="pt-2">
                      <span className="text-base font-medium text-guardian-darkGray">{step}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-guardian-lightPurple/30 to-white rounded-xl flex items-center justify-center p-8">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div 
                  className="mb-6 text-5xl flex justify-center"
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.8 }}
                >
                  {stepIcons[activeStep]}
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3 text-guardian-darkGray">
                  {activeStep === 0 && "Real-time Availability"}
                  {activeStep === 1 && "Quick Reservation"}
                  {activeStep === 2 && "Secure Authentication"}
                  {activeStep === 3 && "Vehicle Registration"}
                  {activeStep === 4 && "Ready to Park"}
                </h3>
                
                <p className="text-guardian-gray">
                  {activeStep === 0 && "Our real-time system shows available parking spots instantly with color indicators for easy navigation."}
                  {activeStep === 1 && "Reserve your preferred spot with our easy-to-use interface. Just a single click and it's yours."}
                  {activeStep === 2 && "Our secure verification process ensures only authorized users can access the parking facility."}
                  {activeStep === 3 && "Register your vehicle details once for a seamless experience on all future visits."}
                  {activeStep === 4 && "Enjoy the convenience of guaranteed parking without hassle. Access the garage with your digital pass."}
                </p>
                
                <div className="mt-6 flex justify-center gap-2">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeStep === i ? 'w-8 bg-guardian-purple' : 'w-2 bg-guardian-lightPurple/50'
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-md border border-guardian-lightGray/50 card-hover"
            >
              <div className={`mb-4 p-3 rounded-lg inline-block ${
                index === 0 ? 'bg-guardian-purple/10 text-guardian-purple' : 
                index === 1 ? 'bg-guardian-magenta/10 text-guardian-magenta' : 
                'bg-guardian-deepPurple/10 text-guardian-deepPurple'
              }`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-guardian-darkGray">{feature.title}</h3>
              <p className="text-guardian-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
