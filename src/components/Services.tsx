'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, Smartphone, HeadphonesIcon, GraduationCap, Lock, Zap } from 'lucide-react';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: BarChart3,
      title: 'Multi-Segment Trading',
      description: 'Access to Equity, F&O, Currency, Commodities, and Mutual Funds all in one platform.',
    },
    {
      icon: Smartphone,
      title: 'Advanced Trading Platform',
      description: 'Trade on-the-go with our mobile app and web platform with real-time market data.',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Customer Support',
      description: 'Get dedicated support from our expert team whenever you need assistance.',
    },
    {
      icon: GraduationCap,
      title: 'Free Training & Research',
      description: 'Access to market research, analysis, and comprehensive trading education.',
    },
    {
      icon: Lock,
      title: 'Secure & Reliable',
      description: 'Bank-grade security with SEBI registered and NSE/BSE approved broker.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Execution',
      description: 'Execute trades in milliseconds with our high-speed trading infrastructure.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
          >
            Everything You Need to Trade
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Comprehensive trading solutions designed for both beginners and experienced traders
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              }}
              className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6"
              >
                <service.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
