'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="glass-card p-4 max-w-sm shadow-2xl">
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-coral/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary-coral" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-main mb-2">
                  {locale === 'zh' 
                    ? '需要咨询？我们随时为您服务' 
                    : 'Hai bisogno di aiuto? Siamo qui per te'}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center text-sm font-semibold text-primary-coral hover:text-primary-coral-dark transition-colors"
                >
                  {locale === 'zh' ? '立即联系' : 'Contattaci ora'} →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
