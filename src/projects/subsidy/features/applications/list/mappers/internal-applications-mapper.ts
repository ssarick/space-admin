import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDateToISO } from '@/shared/utils/functions/date';
import { excludeEmptyObjectValues } from '@/shared/utils/functions/object';
import {
  SubsidyApplication,
  SubsidyApplicationFetchPayload,
  SubsidyApplicationFiltersModel,
  SubsidyApplicationInternal
} from '@/projects/subsidy/shared/types/application.types';

export default class SubsidyInternalApplicationsMapper {

  static toInternalList(
    applications: SubsidyApplication[]
  ): SubsidyApplicationInternal[] {
    return applications.map(
      SubsidyInternalApplicationsMapper.toInternal
    );
  }

  static toInternal(
    application: SubsidyApplication
  ): SubsidyApplicationInternal {
    return {
      ...application,
      loadingForDelete: false
    };
  }

  static toFilters(
    filters: SubsidyApplicationFiltersModel
  ): SubsidyApplicationFetchPayload {
    return excludeEmptyObjectValues({
      ...filters,
      amountPayableTiyinFrom: filters.amountPayableTiyinFrom
        ? AmountFormatter.multiplyAndRound(
          AmountFormatter.toAmount(filters.amountPayableTiyinFrom)
        )
        : undefined,
      amountPayableTiyinTo: filters.amountPayableTiyinTo
        ? AmountFormatter.multiplyAndRound(
          AmountFormatter.toAmount(filters.amountPayableTiyinTo)
        )
        : undefined,
      paymentDayFrom: filters.paymentDayFrom
        ? formatDateToISO(filters.paymentDayFrom)
        : undefined,
      paymentDayTo: filters.paymentDayTo
        ? formatDateToISO(filters.paymentDayTo)
        : undefined
    });
  }

}
