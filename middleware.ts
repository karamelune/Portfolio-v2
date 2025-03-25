// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Inclure tous les chemins sauf les ressources statiques, API, etc.
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
