import { decode, encode } from 'js-base64';

export default class Base64Utils {

  static encode(payload: string): string {
    return encode(payload);
  }

  static decode(payload: string): string {
    return decode(payload);
  }

}

