import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import tr from './locales/tr.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en.translation, // Or just en if your json structure is flat
            },
            tr: {
                translation: tr.translation, // Or just tr
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already safe from XSS
        },
        detection: {
            order: ['queryString', 'cookie', 'localStorage', 'navigator'],
            caches: ['localStorage', 'cookie'],
        },
    });

export default i18n;
