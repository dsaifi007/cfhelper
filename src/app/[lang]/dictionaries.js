
import 'server-only'
 
const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  de: () => import('../dictionaries/de.json').then((module) => module.default),
  uk: () => import('../dictionaries/uk.json').then((module) => module.default),
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  }
  return dictionaries['en']();
};