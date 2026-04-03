import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { title: 'LaneVerse India', leaderboard: 'Leaderboard', tournaments: 'Tournaments' } },
  hi: { translation: { title: 'लेनवर्स इंडिया', leaderboard: 'लीडरबोर्ड', tournaments: 'टूर्नामेंट' } }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});
