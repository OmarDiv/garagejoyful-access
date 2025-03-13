
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Smartphone, BarChart3 } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  const features = [
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      description: "Our system uses advanced authentication protocols to ensure only authorized users can access the garage. Each entry is logged and monitored for additional security."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Access your garage from anywhere with our intuitive mobile application. Designed for ease of use, it puts garage management at your fingertips."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track usage patterns, popular parking times, and space utilization with our comprehensive analytics dashboard."
    }
  ];
  
  return (
    <section ref={ref} className="py-24 bg-guardian-lightGray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-semibold text-guardian-darkGray sm:text-4xl mb-4">
            Designed for Modern Convenience
          </h2>
          <p className="text-lg text-guardian-gray">
            GarageGuardian combines cutting-edge technology with thoughtful design to create an experience that's both powerful and simple to use.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
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
          className="mt-24 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-guardian-darkGray mb-4">How it Works</h3>
              <ol className="space-y-6">
                {[
                  "Register and create your account with a few simple steps",
                  "View available parking spots in real-time on the dashboard",
                  "Reserve your spot with a single click",
                  "Enter your name and car number for secure garage access",
                  "Park with peace of mind knowing your spot is secured"
                ].map((step, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-guardian-blue text-guardian-blue text-sm font-medium mr-4">
                      {i + 1}
                    </span>
                    <span className="text-guardian-darkGray">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl bg-guardian-lightGray h-80 flex items-center justify-center">
              <p className="text-guardian-gray italic text-center px-6">
                Interactive diagram placeholder
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
