import { computed } from 'vue';
import { WithdrawalCircleCode } from '@/projects/autopay/shared/types/administration.types';
import { AdministrationStatusesMap, IAdministrationCardProps } from './administration-card.types';

export default function useAdministrationCard(
  props: IAdministrationCardProps
) {
  const statusesData: AdministrationStatusesMap = {
    [WithdrawalCircleCode.PROCESSING]: {
      type: 'success',
      name: 'Processing'
    },
    [WithdrawalCircleCode.BLOCKED]: {
      type: 'error',
      name: 'Blocked'
    },
    [WithdrawalCircleCode.FREEZE]: {
      type: 'error',
      name: 'Freeze'
    },
    [WithdrawalCircleCode.EMPTY]: {
      type: 'primary',
      name: 'Empty'
    }
  };

  const codesForBlock: WithdrawalCircleCode[] = [
    WithdrawalCircleCode.FREEZE,
    WithdrawalCircleCode.PROCESSING,
    WithdrawalCircleCode.EMPTY
  ];

  const codesForUnblock: WithdrawalCircleCode[] = [
    WithdrawalCircleCode.BLOCKED
  ];

  const codesForStart: WithdrawalCircleCode[] = [
    WithdrawalCircleCode.EMPTY
  ];

  const canBlock = computed<boolean>(
    () => codesForBlock.includes(
      props.administrationInfo.code!
    )
  );

  const canUnblock = computed<boolean>(
    () => codesForUnblock.includes(
      props.administrationInfo.code!
    )
  );

  const canStart = computed<boolean>(
    () => codesForStart.includes(
      props.administrationInfo.code!
    )
  );

  return {
    canBlock,
    canUnblock,
    canStart,
    statusesData
  };
}
