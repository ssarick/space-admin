import { SubsidyApplicationStatus } from '../types/application.types';

const editableStatuses:
  SubsidyApplicationStatus[] = [
    SubsidyApplicationStatus.CREATED,
    SubsidyApplicationStatus.VALIDATE_MINFIN,
    SubsidyApplicationStatus.DUPLICATE_MINFIN
  ];

const sendibleToMinfinStatuses:
  SubsidyApplicationStatus[] = [
    ...editableStatuses,
    SubsidyApplicationStatus.SENDING_ERROR
  ];

export function isEditableSubsidyStatus(
  status?: SubsidyApplicationStatus | null
): boolean {
  return !!status
    && editableStatuses.includes(status);
}

export function isSendibleToMinfinSubsidyStatus(
  status?: SubsidyApplicationStatus | null
): boolean {
  return !!status
    && sendibleToMinfinStatuses.includes(status);
}
