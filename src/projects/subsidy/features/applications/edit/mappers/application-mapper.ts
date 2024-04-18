import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDateToISO } from '@/shared/utils/functions/date';
import { SubsidyApplication, SubsidyApplicationFormModel, SubsidyApplicationUpdatePayload } from '@/projects/subsidy/shared/types/application.types';

export default class SubsidyApplicationMapper {

  static toFormModel(
    payload: SubsidyApplication
  ): SubsidyApplicationFormModel {
    return {
      pinfl: payload.pinfl,
      accExternal: payload.accExternal,
      contractType: payload.contractType,
      mfo: payload.mfo,
      decision: payload.decision,
      creditAmountTiyin: AmountFormatter
        .divide(payload.creditAmountTiyin)
        .toString(),
      amountThisMonthTiyin: AmountFormatter
        .divide(payload.amountThisMonthTiyin)
        .toString(),
      contractPaymentStartDate: payload.contractPaymentStartDate
        ? Date.parse(payload.contractPaymentStartDate)
        : null,
      percentagePaymentDate: payload.percentagePaymentDate
        ? Date.parse(payload.percentagePaymentDate)
        : null,
      restAmountTiyin: AmountFormatter
        .divide(payload.restAmountTiyin)
        .toString()
    };
  }

  static toUpdatePayload(
    payload: SubsidyApplicationFormModel
  ): Omit<SubsidyApplicationUpdatePayload, 'id'> {
    return {
      ...payload,
      creditAmountTiyin: AmountFormatter
        .multiplyAndRound(
          AmountFormatter.toAmount(payload.creditAmountTiyin)
        ),
      amountThisMonthTiyin: AmountFormatter
        .multiplyAndRound(
          AmountFormatter.toAmount(payload.amountThisMonthTiyin)
        ),
      contractPaymentStartDate: payload.contractPaymentStartDate
        ? formatDateToISO(
          payload.contractPaymentStartDate
        )
        : null,
      percentagePaymentDate: payload.percentagePaymentDate
        ? formatDateToISO(
          payload.percentagePaymentDate
        )
        : null,
      restAmountTiyin: AmountFormatter
        .multiplyAndRound(
          AmountFormatter.toAmount(payload.restAmountTiyin)
        )
    };
  }

}
