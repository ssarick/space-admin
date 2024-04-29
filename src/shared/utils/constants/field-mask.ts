import { MaskOptions } from 'maska';

type Field = 'phone' | 'rrn';

interface IMaskOptions extends
  Omit<MaskOptions, 'mask'> {
  mask: string
}

export const FIELD_MASK_PREFIX = {
  phone: '+998'
};

export const FIELD_MASK: Record<Field, IMaskOptions> = {
  phone: {
    mask: `${FIELD_MASK_PREFIX.phone} ## ###-##-##`
  },
  rrn: {
    mask: '############'
  }
};
