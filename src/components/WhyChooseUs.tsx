'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, DollarSign, Users, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      icon: DollarSign,
      title: 'Zero Brokerage',
      description: 'Zero brokerage on equity delivery trades. Start investing with minimal costs.',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Award,
      title: 'SEBI Registered',
      description: 'Fully regulated and authorized by SEBI, NSE, and BSE for your safety.',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Personal relationship manager and trading experts to guide you.',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: Clock,
      title: 'Quick Account Opening',
      description: 'Open your demat account in just 10 minutes with paperless onboarding.',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-blue-600 font-semibold text-sm uppercase tracking-wider"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
          >
            India&apos;s Trusted Trading Partner
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ x: 10 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <reason.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
              />
              
              <div className="relative z-10 space-y-8">
                <h3 className="text-3xl font-bold text-white">
                  Ready to Start Trading?
                </h3>
                <p className="text-blue-100 text-lg">
                  Join thousands of successful traders who trust Jainam Broking for their investment journey.
                </p>
                
                <div className="space-y-4">
                  {[
                    '✓ Open Free Demat Account',
                    '✓ Get Expert Market Analysis',
                    '✓ Access Premium Tools',
                    '✓ 24/7 Trading Support',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center text-white text-lg"
                    >
                      <span className="mr-2">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  Get Started Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
