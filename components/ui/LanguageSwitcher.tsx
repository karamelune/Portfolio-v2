// components/ui/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isChanging, setIsChanging] = useState(false);

  const switchLocale = async (newLocale: string) => {
    if (locale !== newLocale && !isChanging) {
      setIsChanging(true);

      // Sauvegarde la préférence de langue
      localStorage.setItem('preferredLanguage', newLocale);

      // Construire le nouveau chemin
      const newPathname = pathname.startsWith(`/${locale}`)
        ? pathname.replace(`/${locale}`, `/${newLocale}`)
        : `/${newLocale}${pathname}`;

      router.replace(newPathname);
      setIsChanging(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 rounded-lg bg-gray-800/50 p-1 w-fit ml-auto">
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'en' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
        }`}
        disabled={isChanging}
      >
        🇺🇸
      </button>
      <button
        onClick={() => switchLocale('fr')}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'fr' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
        }`}
        disabled={isChanging}
      >
        🇫🇷
      </button>
    </div>
  );
}
