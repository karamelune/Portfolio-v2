'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import projectsEN from '@/data/projects.en.json';
import projectsFR from '@/data/projects.fr.json';

// Définition des interfaces
interface ProjectType {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  github: string;
  live?: string;
  youAreHere?: string;
  image?: string;
  emoji?: string;
}

export default function ProjectsPage() {
  const t = useTranslations('pages.projects');
  const locale = useLocale();
  const [filter, setFilter] = useState<string>('all');

  // Charger le bon fichier JSON selon la locale
  const projectsData: ProjectType[] = useMemo(() => {
    return locale === 'fr' ? projectsFR : projectsEN;
  }, [locale]);

  // Filtrer les projets selon la catégorie sélectionnée
  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter(
          (project: ProjectType) => project.category === filter,
        );

  // Obtenir les catégories uniques pour les filtres
  const categories: string[] = [
    'all',
    ...new Set(projectsData.map((project: ProjectType) => project.category)),
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* En-tête de la page */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">{t('title')}</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      {/* Filtres des projets */}
      <div className="flex justify-center mb-8 flex-wrap gap-2">
        {categories.map((category: string) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filter === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>

      {/* Grille des projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projet en vedette (plus grand) */}
        {filteredProjects.length > 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gray-800 rounded-xl overflow-hidden">
            <div className="relative h-64 w-full">
              {filteredProjects[0].image ? (
                <Image
                  src={filteredProjects[0].image}
                  alt={filteredProjects[0].title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                  <span className="text-4xl">
                    {filteredProjects[0].emoji || '💻'}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end">
                <div className="p-6">
                  <span className="px-2 py-1 bg-indigo-600 rounded-full text-xs text-white mb-2 inline-block">
                    {t(`categories.${filteredProjects[0].category}`)}
                  </span>
                  <h2 className="text-2xl font-bold text-white">
                    {filteredProjects[0].title}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                {filteredProjects[0].description}
              </p>
              <div className="flex gap-3 flex-wrap mb-4">
                {filteredProjects[0].technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                <Link
                  href={filteredProjects[0].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-lg text-sm text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </Link>
                {filteredProjects[0].live && (
                  <Link
                    href={filteredProjects[0].live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-sm text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    {t('liveButton')}
                  </Link>
                )}
                {filteredProjects[0].youAreHere && (
                  <p className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 transition rounded-lg text-sm text-white">
                    {filteredProjects[0].youAreHere}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Affichage des autres projets */}
        {filteredProjects
          .slice(1)
          .map((project: ProjectType, index: number) => (
            <div
              key={index}
              className="col-span-1 bg-gray-800 rounded-xl overflow-hidden"
            >
              <div className="relative h-48 w-full">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-3xl">{project.emoji || '🚀'}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end">
                  <div className="p-4">
                    <span className="px-2 py-1 bg-indigo-600 rounded-full text-xs text-white mb-2 inline-block">
                      {t(`categories.${project.category}`)}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 transition rounded-lg text-xs text-white"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </Link>
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-xs text-white"
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      {t('liveButton')}
                    </Link>
                  )}
                  {project.youAreHere && (
                    <p className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 transition rounded-lg text-sm text-white">
                      {project.youAreHere}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Message si aucun projet ne correspond au filtre */}
      {filteredProjects.length === 0 && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {t('noProjects.title')}
          </h3>
          <p className="text-gray-400">{t('noProjects.message')}</p>
        </div>
      )}
    </div>
  );
}
