import { i18n } from "../i18n/i18n";
import { LocaleDirection } from "../i18n/types";

export const setObjectValueByPath = (obj: Record<string, any>, path: string, value: any) => {
  let schema = obj;

  const keys = path.split('.');
  const len = keys.length;

  for (let i = 0; i < len - 1; i++) {
    const elem = keys[i];

    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }

  schema[keys[len - 1]] = value;
}

export const getLocaleDirection = (): LocaleDirection => {
  let localeDirection = LocaleDirection.LeftToRight;
  const localeDirectionString = i18n.t("dir");

  if (localeDirectionString === "rtl") {
    localeDirection = LocaleDirection.RightToLeft;
  }

  return localeDirection;
}