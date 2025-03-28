// components/ui/LanguageSwitcher.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const t = useTranslations('common.languages');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isChanging, setIsChanging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const switchLocale = async (newLocale: string) => {
    if (locale !== newLocale && !isChanging) {
      setIsChanging(true);
      setIsOpen(false);

      const timer = setTimeout(() => {
        localStorage.setItem('preferredLanguage', newLocale);
        const newPathname = pathname.startsWith(`/${locale}`)
          ? pathname.replace(`/${locale}`, `/${newLocale}`)
          : `/${newLocale}${pathname}`;

        router.replace(newPathname);
        setIsChanging(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  };

  const flags: { [key: string]: { emoji: string; name: string } } = {
    en: { emoji: '🇺🇸', name: 'English' },
    fr: { emoji: '🇫🇷', name: 'Français' },
  };

  // Drop-down menu animation
  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-20px',
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Animation for individual elements
  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-12 h-12 rounded-full   
           bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500  
           shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95  
           ${isChanging ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isChanging}
        aria-label={t('changeLanguage')}
      >
        <span className="text-xl">{flags[locale].emoji}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute right-0 mt-3 bg-gradient-to-br from-gray-800 to-gray-900 
                     rounded-xl shadow-xl border border-gray-700 overflow-hidden backdrop-blur-md z-50 w-52"
          >
            <div className="p-3">
              <motion.div
                variants={itemVariants}
                className="mb-2 pb-2 border-b border-gray-700"
              >
                <h3 className="text-xl text-white font-bold">{t('title')}</h3>
              </motion.div>

              <ul className="space-y-1">
                {Object.keys(flags).map((langCode) => (
                  <motion.li key={langCode} variants={itemVariants}>
                    <button
                      onClick={() => switchLocale(langCode)}
                      className={`w-full text-left flex items-center gap-3 p-3 rounded-lg 
                              transition-all duration-300
                              ${
                                locale === langCode
                                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                  : 'hover:bg-gray-700/50 text-gray-200'
                              }`}
                      disabled={isChanging}
                    >
                      <span
                        className="w-8 h-8 flex items-center justify-center rounded-full 
                                 bg-gray-800 text-xl shadow-sm"
                      >
                        {flags[langCode].emoji}
                      </span>
                      <span
                        className={`${
                          locale === langCode ? 'font-medium' : ''
                        }`}
                      >
                        {flags[langCode].name}
                      </span>
                      {locale === langCode && (
                        <span className="ml-auto text-sm bg-white/20 px-2 py-0.5 rounded-full">
                          {t('active')}
                        </span>
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
