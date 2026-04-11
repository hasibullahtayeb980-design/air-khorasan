import { i18n } from "./i18n";
import { setObjectValueByPath } from "../utils/utils";
import { defaultTranslations } from "./default-translation";

interface i18nTranslations {
  [key: string]: string | i18nTranslations;
}

type Translations = typeof defaultTranslations;

const getTranslationKeys = (translations: Translations): Translations => {
  const keys: Partial<Translations> = {};

  const findKeys = (obj: i18nTranslations, parentKeysValue = "") => {
    for (const key in obj) {
      const newKey = parentKeysValue ? `${parentKeysValue}.${key}` : key;

      if (typeof obj[key] === "string") {
        setObjectValueByPath(keys, newKey, newKey);
      } else {
        findKeys(obj[key] as i18nTranslations, newKey);
      }
    }
  };

  findKeys(translations);
  return keys as Translations;
};

export const Translation = getTranslationKeys(defaultTranslations);