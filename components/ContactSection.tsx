// components/ContactSection.jsx
import { useTranslations } from 'next-intl';
import { SocialLinks } from '@/components/ui/SocialIcons';

export default function ContactSection() {
  const t = useTranslations('components.contact');

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-3">{t('title')}</h2>
          <p className="mb-4">{t('description')}</p>
          <a
            href="mailto:dylanckx@gmail.com"
            className="bg-white text-purple-700 px-4 py-2 rounded-lg inline-block hover:bg-opacity-90 transition"
          >
            {t('emailButton')}
          </a>
        </div>
        <div className="flex flex-col justify-center md:border-l md:border-white/20 md:pl-6">
          <h3 className="text-lg font-bold text-slate-200 mb-3">
            {t('socials')}
          </h3>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
