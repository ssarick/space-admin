import { IOperDay, OperDayBranch } from '@/projects/b2b/shared/types/oper-day.types';

export const setOperDayProperty = <K extends keyof IOperDay>(
  operDays: IOperDay[],
  key: K,
  newValue: IOperDay[K],
  branch: string | OperDayBranch
) => {
  operDays.forEach(operDay => {
    if (operDay.branch === branch
      || branch === OperDayBranch.ALL) {
      operDay[key] = newValue;
    }
  });
};
