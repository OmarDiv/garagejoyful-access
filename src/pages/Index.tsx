
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold text-guardian-darkGray sm:text-4xl mb-4">
                Trusted by Drivers Everywhere
              </h2>
              <p className="text-lg text-guardian-gray">
                See what our users have to say about their experience with GarageGuardian.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Regular User",
                  quote: "GarageGuardian has made parking so much easier. I can reserve my spot in advance and never worry about finding a place to park."
                },
                {
                  name: "Sarah Williams",
                  role: "Property Manager",
                  quote: "Managing our building's garage has never been easier. The real-time dashboard gives me complete visibility into parking usage."
                },
                {
                  name: "Michael Chen",
                  role: "Business Owner",
                  quote: "The security features are excellent. I feel confident that only authorized users can access our company's garage."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative"
                >
                  <div className="mb-6 text-4xl text-guardian-blue/20">"</div>
                  <p className="text-guardian-darkGray mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-guardian-lightGray"></div>
                    <div className="ml-3">
                      <h4 className="font-medium text-guardian-darkGray">{testimonial.name}</h4>
                      <p className="text-sm text-guardian-gray">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-guardian-blue to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Parking Experience?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already simplified their garage access with GarageGuardian.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/auth?mode=register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white text-guardian-blue rounded-full font-medium hover:bg-blue-50 transition-colors"
              >
                Create Your Account
              </motion.a>
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Explore Dashboard
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
