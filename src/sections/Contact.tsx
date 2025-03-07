'use client';

import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import grainImage from '@/assets/images/grain.jpg';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const ContactSection = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Start a continuous animation sequence
    const startAnimation = async () => {
      while (true) {
        await controls.start({
          y: [0, -5, 0],
          transition: { duration: 2, ease: 'easeInOut' },
        });
        // Small pause between animation cycles
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    startAnimation();
  }, [controls]);

  return (
    <motion.div
      className="py-16 pt-12 lg:py-24 lg:pt-20"
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: '100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          className="bg-gradient-to-r from-purple-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center relative overflow-hidden z-0 md:text-left"
          initial={{ borderRadius: '16px', scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ margin: '100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          animate={{
            boxShadow: [
              '0px 4px 12px rgba(0, 0, 0, 0.1)',
              '0px 8px 24px rgba(0, 0, 0, 0.15)',
              '0px 4px 12px rgba(0, 0, 0, 0.1)',
            ],
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-5 -z-10"
            style={{
              backgroundImage: `url(${grainImage.src})`,
            }}
            animate={{
              opacity: [0.05, 0.08, 0.05],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          ></motion.div>
          <div className="flex flex-col gap-8 md:gap-16 items-center md:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '100px' }}
              transition={{ duration: 0.5 }}
              animate={controls}
            >
              <h2 className="font-serif text-2xl md:text-3xl">
                Join me—let&apos;s turn ideas into something amazing.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '100px' }}
              transition={{ duration: 0.5 }}
            >
              <motion.a
                href="mailto:appalahemanth413@gmail.com?subject=Let's%20Work%20Together&body=Hi%20there%2C%20I'm%20interested%20in%20working%20with%20you!"
                className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#000',
                  boxShadow:
                    '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                animate={{
                  y: [0, -3, 0],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }}
              >
                <motion.span className="font-semibold" whileHover={{ x: -2 }}>
                  Contact Me
                </motion.span>
                <motion.div
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  animate={{
                    x: [0, 2, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <ArrowUpRightIcon className="size-4" />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
