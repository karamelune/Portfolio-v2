'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export function useLanguagePreference() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Vérifie si le code s'exécute côté client
        if (typeof window !== 'undefined') {
            // Vérifie si une préférence de langue est stockée
            const storedLocale = localStorage.getItem('preferredLanguage');

            // Si une préférence existe et est différente de la locale actuelle
            if (storedLocale && storedLocale !== locale) {
                // Correction: inclure la locale directement dans le chemin
                // Assurons-nous que nous gérons correctement le chemin
                const newPathname = pathname.startsWith(`/${locale}`)
                    ? pathname.replace(`/${locale}`, `/${storedLocale}`)
                    : `/${storedLocale}${pathname}`;

                router.replace(newPathname);
            } else {
                // Sinon, stocke la locale actuelle
                localStorage.setItem('preferredLanguage', locale);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return locale;
}
