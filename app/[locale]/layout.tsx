import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import BackgroundChanger from '@/components/BackgroundChanger';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  try {
    // Récupérer la locale depuis les paramètres
    const { locale } = await params;

    // Vérifier si la locale est valide
    if (!hasLocale(routing.locales, locale)) {
      return notFound();
    }

    // Utiliser getMessages au lieu d'importer directement
    const messages = await getMessages();

    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <BackgroundChanger>
          <Header />
          {children}
        </BackgroundChanger>
      </NextIntlClientProvider>
    );
  } catch (error) {
    console.error('Error in LocaleLayout:', error);
    return notFound();
  }
}
