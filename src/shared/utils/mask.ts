import { MaskInputOptions } from 'maska';
import { globalConfig } from '../config/global-config';
import { regExp } from './regular-expressions';

export const amountMaskOptions: MaskInputOptions = {
  postProcess: val => {
    if (!val) return '';

    const [ main, sub ] = val.split('.');

    const mainNumbers = main
      .match(regExp.intMatch)?.join('') || 0;

    const result = Number(mainNumbers)
      .toLocaleString('ru');

    return val.includes('.')
      ? `${result}.${sub.slice(0, 2)}`
      : result;
  }
};

export const wholeAmountMaskOptions: MaskInputOptions = {
  postProcess: val => {
    if (!val) return '';

    const main = val
      .match(regExp.intMatch)?.join('') || 0;

    const result = Number(main)
      .toLocaleString('ru');

    return result;
  }
};

export const semverMaskOptions: MaskInputOptions = {
  postProcess: value => {
    const numbersAndDots = value
      .match(regExp.doubleMatch)
      ?.join('') || '';

    const versions = numbersAndDots
      .split('.')
      .filter(item => item)
      .slice(0, globalConfig.semver.maxLength);

    const version = versions.join('.');

    const hasDot = numbersAndDots.slice(-1) === '.'
      && versions.length !== globalConfig.semver.maxLength;

    return hasDot ? `${version}.` : version;
  }
};
