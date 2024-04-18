import { onMounted, reactive, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import usePagination from '@/shared/composables/usePagination';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import {
  IUntrustedModalFilterValues, IUntrustedModalFilterValuesForm
} from '@/projects/autopay/entities/untrusted-card/untrusted-card-filter-modal/untrusted-cards-filter-modal.types';
import { ApiCards } from '@/projects/autopay/shared/api/index';
import { ICard, UntrustedCardStatus } from '@/projects/autopay/shared/types/card.types';
import { formValueFields, formValueNamings, numberValues } from './utils';

export default function useUntrustedCards() {
  const dialog = useDialog();
  const message = useMessage();
  const modalState = ref<boolean>(false);
  const cardsLoading = ref(false);
  const cardsSubmitLoading = ref(false);
  const cards = ref<ICard[]>([]);
  const checkedValuesIds = reactive<number[]>([]);
  const activeFIlters = reactive<IUntrustedModalFilterValues>({});
  const formValue = reactive<IUntrustedModalFilterValuesForm>({ ...formValueFields });
  const tableRef = useTableRef();
  const formValuesNaming = formValueNamings;

  const {
    pageNumber,
    pageSize,
    pageCount
  } = usePagination(tableRef);

  const fetchCards = async () => {

    cardsLoading.value = true;

    const filterOptions = {};

    Object.keys(formValue).forEach(key => {
      if (formValue[key]) {
        filterOptions[key] = formValue[key];
      }
    });

    numberValues.forEach(value => {
      if (filterOptions[value]) {
        filterOptions[value] = +filterOptions[value];
      }
    });

    const { items, totalPages } = await ApiCards
      .fetchCards({
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        ...filterOptions
      });

    cards.value = items || [];
    pageCount.value = totalPages || 0;
    cardsLoading.value = false;

    checkedValuesIds.splice(0, checkedValuesIds.length);
  };

  const toggleCheckedValueInArray = (card: ICard) => {
    const indexValueInArray = checkedValuesIds.indexOf(card.id);
    if (indexValueInArray === -1) {
      checkedValuesIds.push(card.id);
      return;
    }
    checkedValuesIds.splice(indexValueInArray, 1);
  };

  const approveOrDeclineCard = (cardIds: number[], isApproving: boolean) => {
    if (checkedValuesIds.length) {
      dialog.warning({
        title: 'Подтвердите действие',
        content: 'Вы уверены в этом?',
        positiveText: 'Да',
        negativeText: 'Закрыть',
        showIcon: false,
        positiveButtonProps: {
          get loading() {
            return cardsSubmitLoading.value;
          }
        },
        onPositiveClick: async () => {
          let resultOfCardChanges: UntrustedCardStatus[];
          let hasError = false;

          cardsSubmitLoading.value = true;

          if (isApproving) {
            resultOfCardChanges = (await ApiCards.approveCards(cardIds)).items;
          } else {
            resultOfCardChanges = (await ApiCards.declineCards(cardIds)).items;
          }

          cardsSubmitLoading.value = false;

          resultOfCardChanges.forEach(resultOfChange => {
            if (resultOfChange.error) {
              hasError = true;

              message.error(resultOfChange.error);
            }
          });

          hasError || message.success(
            'Ваша карта успешно отредактирована'
          );

          fetchCards();
        }
      });
    } else {
      message.warning('Выберите карту!');
    }
  };

  const filterCards = (event) => {
    event.preventDefault();
    Object.keys(formValue).forEach(val => {
      if (formValue[val]) {
        activeFIlters[val] = formValue[val];
      } else {
        delete activeFIlters[val];
      }
    });
    pageNumber.value = 1;
    closeModal();
    fetchCards();
  };

  const removeFilter = (key) => {
    delete activeFIlters[key];
    formValue[key] = '';
    fetchCards();
  };

  const showModal = () =>
    modalState.value = true;

  const closeModal = () =>
    modalState.value = false;

  onMounted(() => {
    fetchCards();
  });

  return {
    modalState,
    showModal,
    closeModal,
    approveOrDeclineCard,
    toggleCheckedValueInArray,
    formValue,
    filterCards,
    activeFIlters,
    formValuesNaming,
    removeFilter,
    cards,
    cardsLoading,
    tableRef,
    fetchCards,
    checkedValuesIds
  };
}
