import Base64Utils from './base64';

export default class JwtUtils {

  static parsePayload<T extends object>(
    token?: string | null
  ): T | null {
    if (token) {
      try {
        const [ , tokenPayload ] = token.split('.');
        const jsonPayload = Base64Utils.decode(tokenPayload);
        const payload = JSON.parse(jsonPayload);

        return payload;
      } catch (error) {
        console.error(error);
      }
    }

    return null;
  }

}
