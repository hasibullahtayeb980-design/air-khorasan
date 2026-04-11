import { I18n } from "i18n-js";
import { defaultTranslations } from "./default-translation";
import { LocaleDirection } from "./types";
import { fa_AF } from "./fa-af";

// Set the key-value pairs for the different languages you want to support.
export const i18n = new I18n({
  en: {
    ...defaultTranslations,
  },
  fa: {
    ...fa_AF,
  },
});

// Set the locale once at the beginning of your app.
// i18n.locale = getLocales()[0].languageCode;
i18n.locale = "fa";