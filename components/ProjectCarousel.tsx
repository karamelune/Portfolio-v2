'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

export type Project = {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  github?: string;
  live?: string;
  youAreHere?: string;
  emoji?: string;
};

type ProjectCarouselProps = {
  projects: Project[];
  locale: string;
};

export default function ProjectCarousel({
  projects,
  locale,
}: ProjectCarouselProps) {
  const t = useTranslations('pages.home.projects');
  const tC = useTranslations('common.projectCard');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const allProjects = [
    ...projects,
    // Teasing card
    {
      title: tC('viewAllCard.title'),
      description: tC('viewAllCard.description'),
      category: 'featured',
      technologies: ['React', 'Next.js', 'TailwindCSS'],
      emoji: '🚀',
    },
  ];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? allProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === allProjects.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setIsDragging(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className="p-4 relative">
      <p className="text-gray-300 text-sm mb-5">{t('description')}</p>

      <div className="relative" ref={carouselRef}>
        {/* Wrapper for swiping without affecting the flip */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="touch-none"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {/* Special “See all projects” teaser card */}
              {currentIndex === allProjects.length - 1 ? (
                <div className="h-64 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-xl text-white font-bold mb-2">
                    {allProjects[currentIndex].title}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {allProjects[currentIndex].description}
                  </p>
                  <Link
                    href={`${locale}/projects`}
                    className="bg-white hover:bg-white/90 text-purple-700 px-6 py-2 rounded-full font-medium transition-colors"
                  >
                    {t('viewAll')} ✨
                  </Link>
                </div>
              ) : (
                <ProjectCard
                  project={allProjects[currentIndex]}
                  locale={locale}
                  isDragging={isDragging}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="bg-gray-700/70 hover:bg-gray-700 text-xl p-2 rounded-full transition-colors"
            aria-label="Previous project"
          >
            👈
          </button>
          <div className="flex space-x-2">
            {allProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 w-2 rounded-full ${
                  idx === currentIndex ? 'bg-purple-500' : 'bg-gray-600'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-gray-700/70 hover:bg-gray-700 text-xl p-2 rounded-full transition-colors"
            aria-label="Next project"
          >
            👉
          </button>
        </div>
      </div>
    </div>
  );
}
