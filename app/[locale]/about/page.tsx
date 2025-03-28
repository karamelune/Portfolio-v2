import { useTranslations } from 'next-intl';
import ContactSection from '@/components/ContactSection';

export default function AboutPage() {
  const t = useTranslations('pages.about');

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main introduction - Full width */}
        <div className="col-span-1 md:col-span-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg mb-3">{t('subtitle')}</p>
        </div>

        {/* Photo */}
        <div className="col-span-1 bg-gray-800 rounded-xl overflow-hidden">
          <div className="relative h-full w-full min-h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-600">
              👨‍💻
            </div>
          </div>
        </div>

        {/* Bio section - 3 columns for more text */}
        <div className="col-span-1 md:col-span-3 bg-gray-800 rounded-xl p-6">
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

        {/* Detailed Skills - 2 columns */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl text-white font-bold mb-4">
            {t('skills.title')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Frontend */}
            <div className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">👨‍💻</span>
                <h3 className="text-yellow-400 font-bold">
                  {t('skills.frontend.title')}
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                {t('skills.frontend.list')
                  .split(',')
                  .map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-yellow-500 mr-2">●</span>
                      {skill.trim()}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">⚙️</span>
                <h3 className="text-blue-400 font-bold">
                  {t('skills.backend.title')}
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                {t('skills.backend.list')
                  .split(',')
                  .map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-blue-500 mr-2">●</span>
                      {skill.trim()}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Design */}
            <div className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🎨</span>
                <h3 className="text-green-400 font-bold">
                  {t('skills.design.title')}
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                {t('skills.design.list')
                  .split(',')
                  .map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-green-500 mr-2">●</span>
                      {skill.trim()}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Others */}
            <div className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🔧</span>
                <h3 className="text-pink-400 font-bold">
                  {t('skills.other.title')}
                </h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                {t('skills.other.list')
                  .split(',')
                  .map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="text-pink-500 mr-2">●</span>
                      {skill.trim()}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Philosophy/Approach */}
        <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl text-white font-bold mb-4">
            {t('approach.title')}
          </h2>
          <div className="bg-gray-900 p-4 rounded-lg text-green-400 font-mono text-sm mb-4">
            <pre className="overflow-x-auto">
              {`function myApproach() {\n  return {\n    clean: true,\n    efficient: true,\n    maintainable: true,\n    userFocused: true\n  };\n}`}
            </pre>
          </div>
          <p className="text-gray-300 mb-3">{t('approach.description')}</p>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="bg-gray-700/30  p-2 rounded-lg flex items-center hover:bg-gray-700/40 transition-all"
              >
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 mr-3 flex-shrink-0">
                  {['✨', '⚡', '♻️', '👥'][num - 1]}
                </div>
                <div>
                  <p className="text-white font-medium mb-1">
                    {t(`approach.pointTitle${num}`)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {t(`approach.point${num}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education - full width */}
        <div className="col-span-1 md:col-span-4 bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl text-white font-bold mb-4">
            {t('education.title')}
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-700/30 rounded-lg p-5 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center mb-3">
                <div className="min-w-[40px] h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-xl">
                  🎓
                </div>
                <div className="ml-3">
                  <h3 className="text-white font-bold">
                    {t(`education.item1.degree`)}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {t(`education.item1.years`)}
                  </p>
                </div>
              </div>
              <p className="text-gray-300">
                {t(`education.item1.description`)}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section Component */}
        <div className="col-span-1 md:col-span-4">
          <ContactSection fullWidth />
        </div>
      </div>
    </div>
  );
}
