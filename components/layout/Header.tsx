'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('common');
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestionnaire de clic à l'extérieur
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Vérifie si le menu est ouvert et que le clic n'est ni sur le menu ni sur le bouton
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Ajoute l'écouteur d'événement lorsque le menu est ouvert
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Nettoyage de l'écouteur lors du démontage du composant
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  // Animation pour les 3 barres du hamburger
  const topLineVariants = {
    closed: { y: 0, rotate: 0 },
    open: { y: 10, rotate: 45 },
  };

  const middleLineVariants = {
    closed: { opacity: 1, width: '60%' },
    open: { opacity: 0, width: 0 },
  };

  const bottomLineVariants = {
    closed: { y: 0, rotate: 0 },
    open: { y: -10, rotate: -45 },
  };

  // Animation pour le menu déroulant
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        when: 'afterChildren',
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.25,
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  // Animation pour chaque élément du menu
  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <header
      className={`transition-all duration-300 z-50 w-full ${
        isScrolled
          ? 'sticky top-0 bg-gray-800/90 shadow-md backdrop-blur-sm border-b border-gray-700'
          : 'relative bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <Link
            href={'/'}
            className="text-xl hover:opacity-80 transition-opacity"
          >
            🏠
          </Link>

          <div className="relative">
            {/* Hamburger Icon Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 relative rounded-full hover:bg-gray-700/50 transition-colors"
              aria-label="Menu"
            >
              <motion.div
                className="w-6 h-0.5 bg-gray-200 absolute"
                variants={topLineVariants}
                initial="closed"
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}
                style={{ top: '35%' }}
              />
              <motion.div
                className="h-0.5 bg-gray-200 absolute"
                variants={middleLineVariants}
                initial="closed"
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}
                style={{ top: '50%' }}
              />
              <motion.div
                className="w-6 h-0.5 bg-gray-200 absolute"
                variants={bottomLineVariants}
                initial="closed"
                animate={isMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.2 }}
                style={{ top: '65%' }}
              />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden w-64 backdrop-blur-md"
                >
                  <div className="p-4">
                    <motion.div
                      className="mb-4 pb-3 border-b border-gray-700"
                      variants={itemVariants}
                    >
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Navigation
                      </span>
                    </motion.div>

                    <ul className="space-y-2">
                      <motion.li variants={itemVariants}>
                        <Link
                          href={`/${locale}/about`}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors group text-gray-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 group-hover:bg-indigo-600 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>{t('navigation.about')}</span>
                        </Link>
                      </motion.li>

                      <motion.li variants={itemVariants}>
                        <Link
                          href={`/${locale}/projects`}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors group text-gray-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 group-hover:bg-indigo-600 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span>{t('navigation.projects')}</span>
                        </Link>
                      </motion.li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Language switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
