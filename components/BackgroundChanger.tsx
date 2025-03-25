'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface BackgroundChangerProps {
  query?: string;
  interval?: number;
  children: React.ReactNode;
}

interface StoredBackground {
  url: string;
  timestamp: number;
  query: string;
}

export default function BackgroundChanger({
  query = 'landscape',
  interval = 300000, // milliseconds
  children,
}: BackgroundChangerProps) {
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');

  const fetchRandomImage = async () => {
    try {
      // Utiliser l'API route sécurisée
      const response = await axios.get(
        `/api/unsplash?query=${encodeURIComponent(query)}`,
      );

      const newUrl = response.data.urls.regular;
      setBackgroundUrl(newUrl);

      // Enregistrer dans localStorage
      const newBackground: StoredBackground = {
        url: newUrl,
        timestamp: Date.now(),
        query,
      };
      localStorage.setItem('backgroundInfo', JSON.stringify(newBackground));
    } catch (error) {
      console.error("Erreur lors du chargement de l'image:", error);
    }
  };

  useEffect(() => {
    // Vérifier s'il existe un fond enregistré et s'il est encore valide
    const checkAndUpdateBackground = () => {
      // Vérifier si nous sommes côté client (pour éviter les erreurs SSR)
      if (typeof window === 'undefined') return;

      const storedBackgroundJSON = localStorage.getItem('backgroundInfo');

      if (storedBackgroundJSON) {
        try {
          const storedBackground: StoredBackground =
            JSON.parse(storedBackgroundJSON);
          const currentTime = Date.now();
          const elapsedTime = currentTime - storedBackground.timestamp;

          // Récupérer une nouvelle image si la requête a changé
          if (storedBackground.query !== query) {
            fetchRandomImage();
            return;
          }

          // Utiliser l'image stockée si moins de 2 minutes se sont écoulées
          if (elapsedTime < interval) {
            setBackgroundUrl(storedBackground.url);

            // Programmer le prochain changement d'image
            const remainingTime = interval - elapsedTime;
            const timeoutId = setTimeout(fetchRandomImage, remainingTime);
            return () => clearTimeout(timeoutId);
          } else {
            // Intervalle dépassé, récupérer une nouvelle image
            fetchRandomImage();
          }
        } catch (error) {
          console.error("Erreur lors de l'analyse du fond stocké:", error);
          fetchRandomImage();
        }
      } else {
        // Aucun fond stocké, en récupérer un nouveau
        fetchRandomImage();
      }
    };

    checkAndUpdateBackground();

    // Configurer l'intervalle pour les changements suivants
    const intervalId = setInterval(fetchRandomImage, interval);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, interval]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Fond d'écran avec transition */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
        style={{
          backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
        }}
      />

      {/* Overlay pour améliorer la lisibilité du contenu */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Contenu */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
