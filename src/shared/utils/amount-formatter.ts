import { globalConfig } from '../config/global-config';
import { regExp } from './regular-expressions';

export default class AmountFormatter {

  static readonly DEFAULT_DIVIDE =
    10 ** globalConfig.amount.remainderLength;

  static readonly REMAINDER_LENGTH =
    globalConfig.amount.remainderLength;

  static divide(
    amount?: number | null,
    divider: number | null = AmountFormatter.DEFAULT_DIVIDE
  ): number {
    divider ||= 0;
    amount = (amount || 0) / divider;

    return amount;
  }

  static divideAndFormat(
    amount?: number | null,
    currency?: string | null,
    divider: number | null = AmountFormatter.DEFAULT_DIVIDE
  ): string {
    return AmountFormatter.format(
      AmountFormatter.divide(amount, divider),
      currency
    );
  }

  static format(
    amount?: number | null,
    currency?: string | null
  ): string {
    amount ||= 0;

    const formattedAmount = amount
      .toLocaleString('ru', {
        minimumFractionDigits: AmountFormatter.REMAINDER_LENGTH,
        maximumFractionDigits: AmountFormatter.REMAINDER_LENGTH
      })
      .replace(',', '.');

    return currency
      ? `${formattedAmount} ${currency}`
      : formattedAmount;
  }

  static multiplyAndRound(
    amount?: number | null,
    multiplier: number | null = AmountFormatter.DEFAULT_DIVIDE
  ): number {
    amount ||= 0;
    multiplier ||= 0;

    return Math.floor(amount * multiplier);
  }

  static toAmount(
    amount?: string | null
  ): number {
    amount ||= '0';

    return +(
      amount.match(regExp.doubleMatch)?.join('') || 0
    );
  }

}
