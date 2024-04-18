import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';

export const uzUz = {
  name: 'uz-UZ',
  global: {
    undo: 'Bekor qilish',
    redo: 'Qayta qiling',
    confirm: 'Tasdiqlash'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: `${DATE_FORMAT} HH:mm:ss`,
    quarterFormat: 'yyyy-qqq',
    clear: 'Tozalash',
    now: 'Hozir',
    confirm: 'Tasdiqlash',
    selectTime: 'Vaqtni tanlang',
    selectDate: 'Sanani tanlang',
    datePlaceholder: 'Sanani tanlang',
    datetimePlaceholder: 'Sana va vaqtni tanlang',
    monthPlaceholder: 'Oyni tanlang',
    yearPlaceholder: 'Yilni tanlang',
    quarterPlaceholder: 'Chorakni tanlang',
    startDatePlaceholder: 'Boshlanish sanasi',
    endDatePlaceholder: 'Tugash sanasi',
    startDatetimePlaceholder: 'Boshlanish sanasi va vaqti',
    endDatetimePlaceholder: 'Tugash sanasi va vaqti',
    monthBeforeYear: true,
    firstDayOfWeek: 6,
    today: 'Bugun'
  },
  Pagination: {
    goto: 'O\'tish',
    selectionSuffix: 'sahifa'
  },
  Popconfirm: {
    positiveText: 'Tasdiqlash',
    negativeText: 'Bekor qilish'
  },
  Cascader: {
    placeholder: 'Tanlang',
    loading: 'Yuklanmoqda',
    loadingRequiredMessage: (label: string) =>
      `Belgilashdan oldin ${label} ning barcha ichki elementlarini tanlang.`
  },
  Time: {
    dateFormat: DATE_FORMAT,
    dateTimeFormat: `${DATE_FORMAT} HH:mm:ss`
  },

  DataTable: {
    checkTableAll: 'Jadvaldagi barchasini tanlash',
    uncheckTableAll: 'Jadvaldagi barcha tanlovni olib tashlash',
    confirm: 'Tasdiqlash',
    clear: 'Tozalash'
  },
  Transfer: {
    sourceTitle: 'Manba',
    targetTitle: 'Maqsad'
  },
  Empty: {
    description: 'Maʼlumot yoʻq'
  },
  Select: {
    placeholder: 'Tanlang'
  },
  TimePicker: {
    placeholder: 'Vaqtni tanlang',
    positiveText: 'OK',
    negativeText: 'Bekor qilish',
    now: 'Hozir'
  },

  DynamicTags: {
    add: 'Qo\'shish'
  },
  Log: {
    loading: 'Yuklanmoqda'
  },
  Input: {
    placeholder: 'Kiriting'
  },
  InputNumber: {
    placeholder: 'Kiriting'
  },
  DynamicInput: {
    create: 'Yaratmoq'
  },
  ThemeEditor: {
    title: 'Mavzu muharriri',
    clearAllVars: 'Barcha o\'zgaruvchilarni tozalash',
    clearSearch: 'Qidiruvni tozalash',
    filterCompName: 'Filtr komponenti nomi',
    filterVarName: 'Filter Variable Name',
    import: 'Import',
    export: 'Export',
    restore: 'Reset to Default'
  },
  Image: {
    tipPrevious: 'Oldingi rasm (←)',
    tipNext: 'Keyingi rasm (→)',
    tipCounterclockwise: 'Soat miliga teskari',
    tipClockwise: 'Soat yo\'nalishi bo\'yicha',
    tipZoomOut: 'Kichraytirish',
    tipZoomIn: 'Kattalashtirish',
    tipClose: 'Yopish (Esc)'
  }
};
