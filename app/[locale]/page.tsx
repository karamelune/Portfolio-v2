import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('pages.home');
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Section principale */}
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

        {/* Compétences techniques */}
        <div className="col-span-1 bg-gray-800 rounded-xl p-5">
          <h3 className="text-xl text-white font-bold mb-3">
            {t('skills.title')}
          </h3>
          <div className="space-y-2">
            <div className="bg-gray-700 p-3 rounded-lg">
              <h4 className="text-yellow-400">{t('skills.frontend')}</h4>
              <p className="text-gray-300 text-sm">
                React, Next.js, TypeScript
              </p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <h4 className="text-blue-400">{t('skills.backend')}</h4>
              <p className="text-gray-300 text-sm">
                REST API, GraphQL, SQL/NoSQL
              </p>
            </div>
          </div>
        </div>

        {/* Passions */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-5">
          <div className="flex items-start space-x-4">
            <div className="min-w-[40px] h-10 px-2 bg-indigo-500 rounded-full flex items-center justify-center text-xl">
              🎮
            </div>
            <div>
              <h3 className="text-xl text-white font-bold mb-1">
                {t('gaming.title')}
              </h3>
              <p className="text-gray-300 text-sm mb-2">
                {t('gaming.description')}
              </p>

              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center mb-1">
                  <span className="text-yellow-400 mr-2">📚</span>
                  <h4 className="text-white font-medium">
                    {t('learning.title')}
                  </h4>
                </div>
                <p className="text-gray-300 text-sm">
                  {t('learning.description')}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {/* Badges de technologie */}
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
            </div>
          </div>
        </div>

        {/* Qualité de code */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-5">
          <h3 className="text-xl text-white font-bold mb-3">
            {t('codeQuality.title')}
          </h3>
          <div className="bg-gray-900 p-3 rounded-lg text-green-400 font-mono text-xs mb-3">
            <pre className="overflow-x-auto">
              {
                'const cleanCode = (project) => {\n  return project\n    .optimize()\n    .structure()\n    .deliver();\n};'
              }
            </pre>
          </div>
          <p className="text-gray-300 text-sm">
            {t('codeQuality.description')}
          </p>
        </div>

        {/* Projets */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl overflow-hidden">
          <div className="relative h-40 w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              {t('projects.title')}
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-300 text-sm mb-3">
              {t('projects.description')}
            </p>
            <Link
              href={`${locale}/projects  `}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              {t('projects.viewButton')} →
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="col-span-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white">
          <h3 className="text-xl font-bold mb-3">{t('contact.title')}</h3>
          <p className="mb-3 text-sm">{t('contact.description')}</p>
          <a
            href="mailto:dylanckx@gmail.components/dylanckx"
            className="bg-white text-purple-700 px-3 py-1 rounded-lg text-sm inline-block hover:bg-opacity-90"
          >
            {t('contact.emailButton')}
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="col-span-1 md:col-span-4 bg-gray-800 rounded-xl p-4">
          <h4 className="text-center text-lg font-bold text-slate-200 mb-3">
            {t('contact.socials')}
          </h4>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
