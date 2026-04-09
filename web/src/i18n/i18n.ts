import { I18n } from "i18n-js";
import { defaultTranslations } from "./default-translation";

// Set the key-value pairs for the different languages you want to support.
export const i18n = new I18n({
  en: {
    ...defaultTranslations,
  },
  ja: {
    ...defaultTranslations,
    review: {
      ...defaultTranslations.review,
      welcome: "ようこそ %{name}",
    },
  },
});

// Set the locale once at the beginning of your app.
// i18n.locale = getLocales()[0].languageCode;
i18n.locale = "ja";