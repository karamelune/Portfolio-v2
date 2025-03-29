import { useTranslations } from 'next-intl';
import { SocialLinks } from '@/components/ui/SocialIcons';

export default function ContactSection({ fullWidth = false }) {
  const t = useTranslations('components.contact');

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white h-full">
      {fullWidth ? (
        // Version pour largeur complète
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:flex-1 md:mr-6">
            <h3 className="text-xl md:text-2xl font-bold mb-3">{t('title')}</h3>
            <p className="mb-4">{t('description')}</p>
            <a
              href="mailto:dylanckx@gmail.com"
              className="bg-white text-purple-700 px-4 py-2 rounded-lg inline-block hover:bg-opacity-90 transition hover:scale-[102%]"
            >
              {t('emailButton')}
            </a>
          </div>
          <div className="mt-4 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-white/20 md:pl-6">
            <h4 className="text-lg font-bold text-slate-200 mb-3">
              {t('socials')}
            </h4>
            <SocialLinks />
          </div>
        </div>
      ) : (
        // Version compacte
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold mb-3">{t('title')}</h3>
            <p className="mb-3 text-sm">{t('description')}</p>
            <a
              href="mailto:dylanckx@gmail.com"
              className="bg-white text-purple-700 px-3 py-1 rounded-lg text-sm inline-block hover:bg-opacity-90 transition hover:scale-[102%]"
            >
              {t('emailButton')}
            </a>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <h4 className="text-sm font-bold text-slate-200 mb-2">
              {t('socials')}
            </h4>
            <SocialLinks />
          </div>
        </div>
      )}
    </div>
  );
}
