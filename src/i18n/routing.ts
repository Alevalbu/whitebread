import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const routingConfig = {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
};