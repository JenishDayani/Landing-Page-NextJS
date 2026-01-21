'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'Services', 'Why Us', 'How It Works', 'What We Offer', 'Offerings', 'Solutions', 'Gallery', 'Contact'];

  const toId = (label: string) => label.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center flex-shrink-0"
          >
            <span className="text-xl sm:text-2xl font-bold text-blue-600">Jainam</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 ml-1">Partner</span>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${toId(item)}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, color: '#2563eb' }}
                className="text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-2 py-1 whitespace-nowrap"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm xl:text-base whitespace-nowrap"
          >
            Get Started
          </motion.button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 flex-shrink-0"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 pb-6"
          >
            <div className="space-y-1 pt-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${toId(item)}`}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm sm:text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
            <button className="w-full mt-4 mx-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium">
              Get Started
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
