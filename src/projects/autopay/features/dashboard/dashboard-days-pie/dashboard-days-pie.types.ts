import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';

export enum StatisticsDateShortcut {
  DATE,
  TODAY,
  YESTERDAY
}

export interface DashboardDaysPieProps {
  processings?: ProcessingType[]
}

export type DatesByShortcuts = Record<
  StatisticsDateShortcut,
  () => number
>
