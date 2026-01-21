'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                Authorized Jainam Broking Sub-Broker
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Start Your{' '}
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Trading Journey
              </span>{' '}
              Today
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Partner with India&apos;s fastest-growing broking firm. Get access to equity, derivatives, 
              currency, and commodities trading with cutting-edge technology and expert support.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(37, 99, 235, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="group bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                Open Demat Account
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: Users, label: '50K+', desc: 'Active Clients' },
                { icon: TrendingUp, label: '₹500Cr+', desc: 'Daily Turnover' },
                { icon: Shield, label: '100%', desc: 'Secure Trading' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <div className="font-bold text-2xl text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative z-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 shadow-2xl"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">NIFTY 50</span>
                  <span className="text-green-300 text-sm font-semibold">+4.30%</span>
                </div>
                <div className="text-white text-3xl font-bold">25,157.50</div>
                <div className="h-24 bg-white/20 rounded-lg flex items-end justify-around p-2">
                  {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                      className="w-2 bg-green-300 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl"
            >
              <TrendingUp className="w-8 h-8 text-green-500" />
            </motion.div>

            <motion.div
              animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl"
            >
              <Shield className="w-8 h-8 text-blue-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
