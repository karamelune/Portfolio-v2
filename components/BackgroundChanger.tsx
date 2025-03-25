'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';

interface BackgroundChangerProps {
  query?: string;
  interval?: number;
  children: React.ReactNode;
  className?: string;
}

interface StoredBackground {
  url: string;
  timestamp: number;
  query: string;
  photographer?: string;
  photographerUrl?: string;
}

export default function BackgroundChanger({
  query = 'landscape',
  interval = 300000, // milliseconds
  children,
  className = '',
}: BackgroundChangerProps) {
  const t = useTranslations('common.unsplash');
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');
  const [photographer, setPhotographer] = useState<string>('');
  const [photographerUrl, setPhotographerUrl] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchRandomImage = async () => {
    // Skip fetching on mobile to improve performance
    if (isMobile) return;

    try {
      const response = await axios.get(
        `/api/unsplash?query=${encodeURIComponent(query)}`,
      );

      const newUrl = response.data.urls.regular;
      setBackgroundUrl(newUrl);

      // Set photographer info for attribution
      if (response.data.user) {
        setPhotographer(response.data.user.name);
        setPhotographerUrl(response.data.user.links.html);
      }

      // Store in localStorage
      const newBackground: StoredBackground = {
        url: newUrl,
        timestamp: Date.now(),
        query,
        photographer: response.data.user?.name,
        photographerUrl: response.data.user?.links.html,
      };
      localStorage.setItem('backgroundInfo', JSON.stringify(newBackground));
    } catch (error) {
      console.error("Erreur lors du chargement de l'image:", error);
    }
  };

  useEffect(() => {
    // Skip on mobile
    if (isMobile) return;

    const checkAndUpdateBackground = () => {
      if (typeof window === 'undefined') return;

      const storedBackgroundJSON = localStorage.getItem('backgroundInfo');

      if (storedBackgroundJSON) {
        try {
          const storedBackground: StoredBackground =
            JSON.parse(storedBackgroundJSON);
          const currentTime = Date.now();
          const elapsedTime = currentTime - storedBackground.timestamp;

          if (storedBackground.query !== query) {
            fetchRandomImage();
            return;
          }

          if (elapsedTime < interval) {
            setBackgroundUrl(storedBackground.url);
            if (storedBackground.photographer) {
              setPhotographer(storedBackground.photographer);
            }
            if (storedBackground.photographerUrl) {
              setPhotographerUrl(storedBackground.photographerUrl);
            }

            const remainingTime = interval - elapsedTime;
            const timeoutId = setTimeout(fetchRandomImage, remainingTime);
            return () => clearTimeout(timeoutId);
          } else {
            fetchRandomImage();
          }
        } catch (error) {
          console.error("Erreur lors de l'analyse du fond stocké:", error);
          fetchRandomImage();
        }
      } else {
        fetchRandomImage();
      }
    };

    checkAndUpdateBackground();

    // Only set interval if not mobile
    if (!isMobile) {
      const intervalId = setInterval(fetchRandomImage, interval);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, interval, isMobile]);

  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      {/* Background only shown on desktop */}
      {!isMobile && backgroundUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat brightness-50"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
        />
      )}
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${!isMobile ? 'bg-black/70' : 'bg-black'}`}
      />
      {/* Photo credits (only on desktop) */}
      {!isMobile && backgroundUrl && (
        <div className="absolute bottom-14 left-2 text-xs text-white/70 z-20">
          {photographer ? (
            <span>
              {t('photoBy')}{' '}
              <a
                href={`${photographerUrl}?utm_source=your_app_name&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {photographer}
              </a>{' '}
              {t('from')}{' '}
              <a
                href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Unsplash
              </a>
            </span>
          ) : (
            <a
              href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              {t('noPhotographer')}
            </a>
          )}
        </div>
      )}
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
}
