export interface IDateTimeFieldValue {
  timeField: string
  timeDefaultValue?: string
}

export interface ILocale {
  days: string[];
  daysShort: string[];
  months: string[];
  monthsShort: string[];
  firstDayOfWeek: number;
  format24h: boolean;
  pluralDay: string;
}

export interface ILocalesMap {
  ru: ILocale;
  uz: ILocale;
  en: ILocale;
}

export type DateTimeField = Record<
  string, IDateTimeFieldValue
>

export type LocaleTypes = 'ru' | 'uz' | 'en'
