export interface IBaseSwitchBarProps {
  modelValue?: boolean;
  leftLabel?: string;
  rightLabel?: string;
}

export interface IBaseSwitchBarEmit {
  (event: 'update:modelValue', value: boolean): void;
}
