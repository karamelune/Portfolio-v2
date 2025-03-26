'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { SocialLinks } from '../ui/SocialIcons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
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

  // Manage clicks to close the menu
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutsideButton =
        buttonRef.current && !buttonRef.current.contains(target);
      const clickedOutsideMobileMenu =
        mobileMenuRef.current && !mobileMenuRef.current.contains(target);
      const clickedOutsideDesktopMenu =
        desktopMenuRef.current && !desktopMenuRef.current.contains(target);

      // If the click is outside the button AND outside the two menus
      if (
        isMenuOpen &&
        clickedOutsideButton &&
        clickedOutsideMobileMenu &&
        clickedOutsideDesktopMenu
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Block scrolling on mobile only when menu is open
    if (isMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.4,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
          <div className="relative z-50">
            <Link
              href={'/'}
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full   
              bg-gray-800/70 hover:bg-gray-700/90 backdrop-blur-sm  
              shadow-md transition-all duration-300 border border-gray-700/50   
              overflow-hidden group transform hover:scale-105 active:scale-95"
              aria-label="Accueil"
            >
              <span className="text-xl md:text-2xl transition-transform">
                🏠
              </span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10   
                    rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </Link>
          </div>

          <div className="relative z-50">
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 rounded-full 
                      bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 
                      shadow-md transition-all transform hover:scale-105 active:scale-95"
              aria-label="Menu"
            >
              <span className="text-xl md:text-2xl">
                {isMenuOpen ? '✖️' : '📋'}
              </span>
            </button>

            {/* Desktop */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={desktopMenuRef}
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute top-full left-0 mt-3 bg-gradient-to-br from-gray-800 to-gray-900 
                          rounded-xl shadow-xl border border-gray-700 overflow-hidden w-80
                          backdrop-blur-md hidden md:block"
                >
                  <div className="p-5">
                    <motion.div
                      variants={itemVariants}
                      className="mb-4 pb-3 border-b border-gray-700"
                    >
                      <h3 className="text-xl font-bold text-white">
                        Navigation
                      </h3>
                    </motion.div>

                    <ul className="space-y-3">
                      <motion.li variants={itemVariants}>
                        <Link
                          href={`/${locale}/about`}
                          className="flex items-center gap-4 p-3 rounded-lg 
                                  bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-indigo-900/30 hover:to-purple-900/30
                                  transition-all duration-300 group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span
                            className="w-10 h-10 flex items-center justify-center rounded-full 
                                      bg-gradient-to-r from-indigo-600 to-purple-600 text-lg shadow-md"
                          >
                            👤
                          </span>
                          <div>
                            <h4 className="text-lg font-medium text-white">
                              {t('navigation.about')}
                            </h4>
                          </div>
                        </Link>
                      </motion.li>

                      <motion.li variants={itemVariants}>
                        <Link
                          href={`/${locale}/projects`}
                          className="flex items-center gap-4 p-3 rounded-lg 
                                  bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-indigo-900/30 hover:to-purple-900/30
                                  transition-all duration-300 group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span
                            className="w-10 h-10 flex items-center justify-center rounded-full 
                                      bg-gradient-to-r from-indigo-600 to-purple-600 text-lg shadow-md"
                          >
                            📁
                          </span>
                          <div>
                            <h4 className="text-lg font-medium text-white">
                              {t('navigation.projects')}
                            </h4>
                          </div>
                        </Link>
                      </motion.li>
                    </ul>

                    <motion.div
                      variants={itemVariants}
                      className="mt-4 pt-4 border-t border-gray-700"
                    >
                      <SocialLinks size="md" className="justify-center" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Language switcher */}
        <div className="z-50 relative">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile - full screen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 h-dvh bg-gradient-to-br from-gray-900/98 to-black/98 backdrop-blur-md md:hidden"
          >
            <div className="container mx-auto h-full flex flex-col px-6 py-20 overflow-y-auto">
              <motion.div
                variants={itemVariants}
                className="mb-8 pb-4 border-b border-gray-700/50"
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  {t('navigation.title')}
                </h2>
                <p className="text-gray-400">{t('navigation.description')}</p>
              </motion.div>

              <div className="flex-1 flex flex-col justify-center">
                <ul className="space-y-6">
                  <motion.li variants={itemVariants}>
                    <Link
                      href={`/${locale}/about`}
                      className="flex items-center gap-6 p-4 rounded-xl 
                              bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-indigo-900/30 hover:to-purple-900/30
                              transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span
                        className="w-16 h-16 flex items-center justify-center rounded-full 
                                  bg-gradient-to-r from-indigo-600 to-purple-600 text-3xl shadow-lg"
                      >
                        👤
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {t('navigation.about')}
                        </h3>
                        <p className="text-gray-400">
                          {t('navigation.aboutDesc')}
                        </p>
                      </div>
                    </Link>
                  </motion.li>

                  <motion.li variants={itemVariants}>
                    <Link
                      href={`/${locale}/projects`}
                      className="flex items-center gap-6 p-4 rounded-xl 
                              bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-indigo-900/30 hover:to-purple-900/30 
                              transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span
                        className="w-16 h-16 flex items-center justify-center rounded-full 
                                  bg-gradient-to-r from-indigo-600 to-purple-600 text-3xl shadow-lg"
                      >
                        📁
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {t('navigation.projects')}
                        </h3>
                        <p className="text-gray-400">
                          {t('navigation.projectsDesc')}
                        </p>
                      </div>
                    </Link>
                  </motion.li>
                </ul>
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-auto pt-8 border-t border-gray-700/50"
              >
                <SocialLinks
                  size="lg"
                  className="justify-center flex-wrap gap-4"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
