export const regExp = {
  string: /^[a-zA-Zа-яА-Я]/,
  latin: /^[a-zA-Z]/,
  int: /^\d+$/,
  intMatch: /[0-9]/g,
  doubleMatch: /[0-9.]/g,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  tag: /(<([^>]+)>)/gi,
  phone: /^\+[0-9]{3} [0-9]{2} [0-9]{3}-[0-9]{2}-[0-9]{2,3}$/,
  space: /\s/g,
  semver: /^\d+\.\d+\.\d+$/
} as const;
