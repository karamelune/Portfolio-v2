import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-gray-800 py-4 mt-4 border-t border-gray-700">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-center text-gray-300 text-sm">
          <p>{t('footer')}</p>
        </div>
      </div>
    </footer>
  );
}
