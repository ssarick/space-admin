import i18n from '@/shared/plugins/i18n';
import { ILocalesMap, LocaleTypes } from '@/shared/types/date.types';
import { ILocale } from '../../types/date.types';

const locales: ILocalesMap = {
  ru: {
    days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split(
      '_'
    ),
    daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    months:
      'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
        '_'
      ),
    monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true,
    pluralDay: 'дней'
  },
  uz: {
    days: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split(
      '_'
    ),
    daysShort: 'Yak_Du_Se_Chor_Pay_Juma_Shanba'.split('_'),
    months:
      'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split(
        '_'
      ),
    monthsShort: 'Yan_Fev_Mart_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split(
      '_'
    ),
    firstDayOfWeek: 1, // 0-6, 0 - Yakshanba, 1 Dushanba, ...
    format24h: true,
    pluralDay: 'Kunlar'
  },
  en: {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    months:
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      ),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false,
    pluralDay: 'days'
  }
};
const defaultLocale = locales.ru;
const defaultMask = 'DD.MM.YYYY';
const token =
  /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g;

const formatter = {
  // Year: 00, 01, ..., 99
  YY(date: Date, dateLocale: ILocale) {
    // workaround for < 1900 with new Date()
    const y = this.YYYY(date, dateLocale) % 100;
    return y >= 0 ? pad(y) : '-' + pad(Math.abs(y));
  },

  // Year: 1900, 1901, ..., 2099
  YYYY(date: Date, _dateLocale?: ILocale) {
    // workaround for < 1900 with new Date()
    return date.getFullYear();
  },

  // Month: 01, 02, ..., 12
  MM(date: Date) {
    return pad(date.getMonth() + 1);
  },

  // Month Short Name: Jan, Feb, ...
  MMM(date: Date, dateLocale: ILocale) {
    return dateLocale.monthsShort[date.getMonth()];
  },

  // Month Name: January, February, ...
  MMMM(date: Date, dateLocale: ILocale) {
    return dateLocale.months[date.getMonth()];
  },

  // Day of month: 01, 02, ..., 31
  DD(date: Date) {
    return pad(date.getDate());
  },

  // Day of week: 0, 1, ..., 6
  d(date: Date) {
    return date.getDay();
  },

  // Day of week: Su, Mo, ...
  dd(date: Date, dateLocale: ILocale) {
    return this.dddd(date, dateLocale).slice(0, 2);
  },

  // Day of week: Sun, Mon, ...
  ddd(date: Date, dateLocale: ILocale) {
    return dateLocale.daysShort[date.getDay()];
  },

  // Day of week: Sunday, Monday, ...
  dddd(date: Date, dateLocale: ILocale) {
    return dateLocale.days[date.getDay()];
  },

  // Hour: 00, 01, ..., 23
  HH(date: Date) {
    return pad(date.getHours());
  },

  // Hour: 1, 2, ..., 12
  h(date: Date) {
    const hours = date.getHours();

    if (hours === 0) return 12;

    return hours > 12 ? hours % 12 : hours;
  },

  // Hour: 01, 02, ..., 12
  hh(date: Date) {
    return pad(this.h(date));
  },

  // Minute: 00, 01, ..., 59
  mm(date: Date) {
    return pad(date.getMinutes());
  },

  // Second: 00, 01, ..., 59
  ss(date: Date) {
    return pad(date.getSeconds());
  },

  // Meridiem: AM, PM
  A(date: Date) {
    return this.h(date) < 12 ? 'AM' : 'PM';
  },

  // Meridiem: am, pm
  a(date: Date) {
    return this.h(date) < 12 ? 'am' : 'pm';
  }
};

function pad(v: number, length = 2, char = '0') {
  if (v === void 0 || v === null) {
    return v;
  }

  const val = '' + v;
  return val.length >= length
    ? val
    : new Array(length - val.length + 1).join(char) + val;
}

function getDateLocale(dateLocale?: LocaleTypes) {
  const locale = i18n.global.locale.value;
  return locales[dateLocale || locale] || defaultLocale;
}

export function formatDate(
  val?: string | number | null,
  mask?: string,
  dateLocale?: LocaleTypes
) {
  if (!val) return;

  const date = new Date(val);

  if (isNaN(date.getTime())) return;

  if (mask === void 0) {
    mask = defaultMask;
  }

  const locale = getDateLocale(dateLocale);

  return mask.replace(token, (match, text) => {
    if (match in formatter)
      return formatter[match](date, locale);

    return text === void 0
      ? match
      : text.split('\\]').join(']');
  });
}
export function convertUTCDateToLocalDate(date: string): Date | null {
  if (!date) return null;

  return new Date(date.endsWith('Z') ? date : date + 'Z');
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDateToUTC(
  date: string | number | Date,
  endDay = false
) {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const dateTime = new Date(date).getTime();
  const newDate = new Date(dateTime - tzoffset);

  if (endDay) newDate.setUTCHours(23, 59, 59, 999);
  const localISOTime = newDate.toISOString();

  return localISOTime;
}

function formatDateTimeToISO(
  value: string | number | Date
): string {
  const date = new Date(value);
  const dateString = formatDateToISO(date);
  const timeString = date.toLocaleTimeString('ru');

  return `${dateString} ${timeString}`;
}

export function formatDateToISO(
  value: string | number | Date
): string {
  const date = new Date(value);

  return date
    .toLocaleDateString('ru')
    .split('.')
    .reverse()
    .join('-');
}

export function getDateNow() {
  const date = new Date();
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate())
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds())
    ].join(':')
  );
}

export function formatDateToLocaleWithTime(dateTime) {
  if (!dateTime) {
    return '';
  }
  const date = new Date(dateTime);
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join('.') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds())
    ].join(':')
  );
}

function setTime(
  value: Date,
  time: string
): Date {
  const [
    hours,
    minutes,
    seconds
  ] = time.split(':');

  value.setHours(+hours);
  value.setMinutes(+minutes);
  value.setSeconds(+seconds);

  return value;
}

export function setTimeAndFormatToUTC(
  value: Date | number,
  time: string = '00:00:00'
): string {
  return formatDateTimeToISO(
    setTime(new Date(value), time)
  );
}
