export default class NumberUtils {

  private static _uniqueId: number = 0;

  static get uniqueString(): string {
    return `id_${NumberUtils.unique}`;
  }

  static get unique(): number {
    return ++NumberUtils._uniqueId;
  }

  static get uniqueLast(): number {
    return NumberUtils._uniqueId;
  }

  static random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(
      Math.random() * (max - min + 1) + min
    );
  }

}
