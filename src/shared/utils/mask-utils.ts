import { Mask } from 'maska';
import { FIELD_MASK, FIELD_MASK_PREFIX } from './constants/field-mask';

export default class MaskUtils {

  private static maskService: Mask = new Mask();

  static mask(
    mask: string,
    value?: string | null
  ): string {
    MaskUtils.maskService.opts.mask = mask;

    return MaskUtils.maskService.masked(value || '');
  }

  static unmask(
    mask: string,
    value?: string | null
  ): string {
    MaskUtils.maskService.opts.mask = mask;

    return MaskUtils.maskService.unmasked(value || '');
  }

  static unmaskPhone(
    value?: string | null
  ): string {
    return value
      ? FIELD_MASK_PREFIX.phone + MaskUtils.unmask(
        FIELD_MASK.phone.mask, value
      )
      : '';
  }

}
