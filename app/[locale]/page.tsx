import { SocialLinks } from '@/components/ui/SocialIcons';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import ProjectCarousel from '@/components/ProjectCarousel';
import projectsEN from '@/data/projects.en.json';
import projectsFR from '@/data/projects.fr.json';

export default function HomePage() {
  const t = useTranslations('pages.home');
  const locale = useLocale();

  // Load the projects data based on the current locale
  const projectsData = useMemo(() => {
    return locale === 'fr' ? projectsFR : projectsEN;
  }, [locale]);

  // Retrieve the latest projects
  const latestProjects = projectsData.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main section */}
        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {t('title')} <span className="text-yellow-300">{t('name')}</span>
          </h1>
          <p className="text-lg">{t('subtitle')}</p>
          <Link
            href={`${locale}/about`}
            className="inline-block mt-4 bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            {t('readMore')}
          </Link>
        </div>

        {/* Photo */}
        <div className="col-span-1 bg-gray-800 rounded-xl overflow-hidden">
          <div className="relative h-full w-full min-h-[200px]">
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-600">
              👨‍💻
            </div>
          </div>
        </div>

        {/* Contact + Socials */}
        <div className="col-span-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-3">{t('contact.title')}</h3>
            <p className="mb-3 text-sm">{t('contact.description')}</p>
            <a
              href="mailto:dylanckx@gmail.com"
              className="bg-white text-purple-700 px-3 py-1 rounded-lg text-sm inline-block hover:bg-opacity-90"
            >
              {t('contact.emailButton')}
            </a>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <h4 className="text-sm font-bold text-slate-200 mb-2">
              {t('contact.socials')}
            </h4>
            <SocialLinks />
          </div>
        </div>

        {/* Clean Code */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-5">
          <h3 className="text-xl text-white font-bold mb-3">
            {t('cleanCode.title')}
          </h3>
          <div className="bg-gray-900 p-3 rounded-lg text-green-400 font-mono text-xs mb-3">
            <pre className="overflow-x-auto">
              {
                'const cleanCode = (project) => {\n  return project\n    .optimize()\n    .structure()\n    .deliver();\n};'
              }
            </pre>
          </div>
          <p className="text-gray-300">{t('cleanCode.description')}</p>
          <ul className="mt-2 text-gray-300 text-sm list-disc pl-5">
            <li>{t('cleanCode.li1')}</li>
            <li>{t('cleanCode.li2')}</li>
            <li>{t('cleanCode.li3')}</li>
          </ul>
        </div>

        {/* Skills */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-5">
          <h3 className="text-xl text-white font-bold mb-3">
            {t('skills.title')}
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-400 pl-3 py-1">
              <h4 className="text-yellow-400">{t('skills.frontend')}</h4>
              <p className="text-gray-300 text-sm">
                React, Next.js, TypeScript
              </p>
            </div>
            <div className="border-l-4 border-blue-400 pl-3 py-1">
              <h4 className="text-blue-400">{t('skills.backend')}</h4>
              <p className="text-gray-300 text-sm">
                REST API, GraphQL, SQL/NoSQL
              </p>
            </div>
            <div className="border-l-4 border-green-400 pl-3 py-1">
              <h4 className="text-green-400">{t('skills.design')}</h4>
              <p className="text-gray-300 text-sm">
                TailwindCSS, Framer Motion, CSS Animations
              </p>
            </div>
          </div>
        </div>

        {/* Hobbies */}
        <div className="col-span-1 md:col-span-4 bg-gray-800 rounded-xl p-5">
          <h3 className="text-xl text-white font-bold mb-3">
            {t('passions.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gaming */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="min-w-[40px] h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-xl">
                  🎮
                </div>
                <h4 className="text-white font-bold ml-3">
                  {t('passions.gaming.title')}
                </h4>
              </div>
              <p className="text-gray-300 text-sm">
                {t('passions.gaming.description')}
              </p>
            </div>

            {/* Learning */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="min-w-[40px] h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center text-xl">
                  📚
                </div>
                <h4 className="text-white font-bold ml-3">
                  {t('passions.learning.title')}
                </h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {t('passions.learning.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded">
                  TypeScript
                </span>
                <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded">
                  React
                </span>
                <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                  Next.js
                </span>
              </div>
            </div>

            {/* Music */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="min-w-[40px] h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
                  🎧
                </div>
                <h4 className="text-white font-bold ml-3">
                  {t('passions.music.title')}
                </h4>
              </div>
              <p className="text-gray-300 text-sm">
                {t('passions.music.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl overflow-hidden">
          <Link href={`${locale}/projects`}>
            <div className="relative h-40 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                {t('projects.title')}
              </div>
            </div>
          </Link>
          <ProjectCarousel projects={latestProjects} locale={locale} />
        </div>

        {/* Placeholder */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-5">
          <h3 className="text-xl text-white font-bold mb-3">Placeholder</h3>
          <p className="text-gray-300 text-sm"></p>
        </div>
      </div>
    </div>
  );
}
