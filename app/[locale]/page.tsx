import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import ProjectCarousel from '@/components/ProjectCarousel';
import projectsEN from '@/data/projects.en.json';
import projectsFR from '@/data/projects.fr.json';
import ContactSection from '@/components/ContactSection';
import SkillsCarousel from '@/components/SkillsCarousel';

export default function HomePage() {
  // Initialize translation functions for both pages
  const t = useTranslations('pages.home');
  const locale = useLocale();

  // Load the projects data based on the current locale (needed for ProjectCarousel)
  const projectsData = useMemo(() => {
    return locale === 'fr' ? projectsFR : projectsEN;
  }, [locale]);

  // Retrieve the latest projects (needed for ProjectCarousel)
  const latestProjects = projectsData.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Use a 4-column grid layout on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 1: Title + Subtitle | Skills */}
        {/* Title + Subtitle */}
        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {t('title')}{' '}
            <span className="text-yellow-300">{t('name')} ! 👋</span>
          </h1>
          <p className="text-lg">{t('subtitle')}</p>
        </div>
        {/* Skills */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-5">
          <SkillsCarousel />
        </div>
        {/* 2: About me | Projects */}
        {/* About me */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl text-white font-bold mb-4">
            {t('bio.title')}
          </h2>
          <div className="text-gray-300 space-y-4">
            <p className="flex items-start">
              <span className="text-xl mr-3">🚀</span>
              <span>{t('bio.paragraph1')}</span>
            </p>
            <p className="flex items-start">
              <span className="text-xl mr-3">💡</span>
              <span>{t('bio.paragraph2')}</span>
            </p>
            <p className="flex items-start">
              <span className="text-xl mr-3">🌐</span>
              <span>{t('bio.paragraph3')}</span>
            </p>
          </div>
        </div>
        {/* Projects */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl overflow-hidden">
          <Link href={`/${locale}/projects`}>
            <div className="relative h-40 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                {t('projects.title')}
              </div>
            </div>
          </Link>
          {/* Pass necessary props */}
          <ProjectCarousel projects={latestProjects} locale={locale} />
        </div>
        {/* 3: Hobbies - Full Width */}
        {/* Hobbies */}
        <div className="col-span-1 md:col-span-4 bg-gray-800 rounded-xl p-5">
          <h3 className="text-xl text-white font-bold mb-3">
            {t('passions.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gaming */}
            <div className="bg-gray-700/30 hover:bg-gray-700/40 rounded-lg p-4">
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
            <div className="bg-gray-700/30 hover:bg-gray-700/40 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="min-w-[40px] h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center text-xl">
                  📚
                </div>
                <h4 className="text-white font-bold ml-3">
                  {t('passions.learning.title')}
                </h4>
              </div>
              <p className="text-gray-300  text-sm mb-3">
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
            <div className="bg-gray-700/30 hover:bg-gray-700/40 rounded-lg p-4">
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
        {/* 4: Philosophy | Certif */}
        <div className="col-span-1 md:col-span-2 rounded-xl overflow-hidden flex flex-col">
          {/* Top Part: Gradient Background */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-xl">
            <h2 className="text-2xl text-white font-bold mb-4">
              {t('approach.title')}
            </h2>
            {/* Code block */}
            <div className="bg-gray-900 p-4 rounded-lg text-green-400 font-mono text-sm mb-0">
              <pre className="overflow-x-auto">
                {`function myApproach() {\n  return {\n    clean: true,\n    efficient: true,\n    maintainable: true,\n    userFocused: true\n  };\n}`}
              </pre>
            </div>
          </div>

          {/* Bottom Part: Dark Background */}
          <div className="bg-gray-800 p-6 rounded-b-xl flex-grow">
            <p className="text-gray-300 mb-3">{t('approach.description')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-gray-700/30 p-2 rounded-lg flex items-center hover:bg-gray-700/40 transition-all"
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 mr-3 flex-shrink-0">
                    {['✨', '⚡', '♻️', '👥'][num - 1]}
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1 text-sm">
                      {t(`approach.pointTitle${num}`)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {t(`approach.point${num}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certif */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-5 flex flex-col items-center text-center">
          <div className="text-5xl mb-3">🎓</div>
          <h3 className="text-2xl text-white font-bold mb-2">
            {t('certif.degree')}
          </h3>
          <h4 className="text-gray-400 text-sm mb-2">
            {t('certif.institution')}
          </h4>
          <p className="text-gray-400 text-sm mb-2">{t('certif.years')}</p>{' '}
          <div className="bg-gray-700/30 rounded-lg p-4 mt-2 max-w-lg hover:bg-gray-700/40 transition-all">
            <p className="text-gray-300 mb-4">
              {t('certif.description').split('\n\n')[0]}
            </p>
            <p className="text-gray-300">
              {t('certif.description').split('\n\n')[1]}
            </p>
          </div>
        </div>
        {/* 5: Contact - Full Width */}
        <div className="col-span-1 md:col-span-4">
          <ContactSection fullWidth />
        </div>
      </div>
    </div>
  );
}
