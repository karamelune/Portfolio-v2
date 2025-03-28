'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Project } from './ProjectCarousel';
import { useTranslations } from 'next-intl';

type ProjectCardProps = {
  project: Project;
  locale: string;
  isDragging: boolean;
};

export default function ProjectCard({
  project,
  locale,
  isDragging,
}: ProjectCardProps) {
  const t = useTranslations('components.projectCard');
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const [hoverScale, setHoverScale] = useState(1);

  useEffect(() => {
    // Reset scale on status changes
    setHoverScale(1);
  }, [isFlipped, project]);

  // Reset flip state when project changes
  useEffect(() => {
    setIsFlipped(false);
  }, [project]);

  const handleCardClick = () => {
    // Do not turn the card over if swiping
    if (!isDragging) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className="relative w-full h-64 cursor-pointer"
      onClick={handleCardClick}
    >
      <AnimatePresence initial={false} mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute inset-0 bg-gray-700 rounded-lg p-4 flex flex-col"
            initial={{ rotateY: 90, opacity: 0, scale: 1 }}
            animate={{ rotateY: 0, opacity: 1, scale: hoverScale }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{
              duration: 0.25,
              scale: { duration: 0.1 },
            }}
            onHoverStart={() => setHoverScale(1.02)}
            onHoverEnd={() => setHoverScale(1)}
            ref={cardRef}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg text-white font-semibold">
                {project.title}
              </h3>
              {project.emoji && (
                <span className="text-2xl">{project.emoji}</span>
              )}
            </div>
            <p className="text-gray-300 text-sm mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">
              {t('moreDetails')}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute inset-0 bg-gray-700 rounded-lg p-4 flex flex-col"
            initial={{ rotateY: 90, opacity: 0, scale: 1 }}
            animate={{ rotateY: 0, opacity: 1, scale: hoverScale }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{
              duration: 0.25,
              scale: { duration: 0.1 },
            }}
            onHoverStart={() => setHoverScale(1.02)}
            onHoverEnd={() => setHoverScale(1)}
            ref={cardRef}
          >
            <h3 className="text-lg text-white font-semibold mb-4">
              {project.title}
            </h3>
            <div className="flex flex-col items-center gap-2 flex-grow w-full">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-3 rounded text-center transition-colors max-w-[400px] w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="mr-2">🔗</span> GitHub
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-center transition-colors max-w-[400px] w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="mr-2">🌐</span> {t('live')}
                </Link>
              )}
              <Link
                href={`${locale}/projects`}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-center mt-auto transition-colors max-w-[400px] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="mr-2">✨</span> {t('viewAll')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
