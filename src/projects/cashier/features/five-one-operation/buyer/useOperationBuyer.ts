import { onMounted, ref } from 'vue';
import print from 'print-js';
import { DATE_SYSTEM_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import { CashboxSellPayload } from '@/projects/cashier/pages/five-one-operation/five-one-operation.types';
import {
  getClientInfoByDocument,
  getCountries,
  getDocumentTypes, submitCashboxSell
} from '@/projects/cashier/shared/api/rrn-payment';
import { Client, CountrySelectOptions, DocumentSelectOptions } from '@/projects/cashier/shared/types/rrn-payment.types';
import { BuyerFormValues, OperationTypeEmits, OperationTypeProps } from './operation-buyer.types';

export default function useOperationBuyer(
  props: OperationTypeProps,
  emit: OperationTypeEmits
) {
  const countries = ref<CountrySelectOptions[]>([]);
  const documentTypes = ref<DocumentSelectOptions[]>([]);
  const currentUser = ref<string>();
  const availableUsers = ref<Client[]>([]);
  const isLoading = ref<boolean>(false);
  const allowedSum = ref<number>(100);

  const isAmountValid = computed<boolean>(() => {
    return (props.rrnFields.amount / 100) > allowedSum.value;
  });

  const formValue = ref<BuyerFormValues>({
    isResident: '',
    documentSeria: '',
    documentNumber: '',
    lastNameLat: '',
    firstName: '',
    patronymName: '',
    birthDate: null,
    birthPlace: '',
    address: '',
    documentType: '',
    documentName: '',
    documentDateBegin: null,
    documentGivePlace: '',
    documentDateEnd: null,
    countryId: 0,
    phoneCode: '',
    phoneNumber: '',
    citizenship: ''
  });

  const validateAndEmitToNextStep = async () => {
    const hasFormError = await submitForm();
    if (hasFormError) return;
    emit('moveToNextStep');
  };

  const emitToPreviousStep = () => {
    emit('moveToPreviousStep');
  };

  const fetchCountries = async () => {
    const { items } = await getCountries();
    countries.value = items.map(country => (
      {
        ...country,
        label: country.name,
        value: country.id
      }
    ));
  };

  const fetchDocumentTypes = async () => {
    const { items } = await getDocumentTypes();
    documentTypes.value = items.map(documentType => (
      {
        ...documentType,
        label: documentType.name,
        value: documentType.id
      }
    ));
  };

  const checkForFillingOfDocumentDataAndFetchClient = async () => {
    if (formValue.value.documentSeria && formValue.value.documentNumber) {
      const { items } = await getClientInfoByDocument({
        documentSeria: formValue.value.documentSeria.toUpperCase(),
        documentNumber: formValue.value.documentNumber
      });
      availableUsers.value = items.map(clientData => ({
        ...clientData,
        label: `${clientData.firstName} ${clientData.lastNameLat}`,
        value: clientData.businessPartnerId
      }));
    }
  };

  const fillTheDataFromClient = () => {
    if (availableUsers.value) {
      const choseUserData = availableUsers.value.find(user =>
        user.businessPartnerId === currentUser.value
      );
      if (choseUserData) {
        formValue.value = {
          ...formValue.value,
          documentSeria: choseUserData.documentSeria,
          documentNumber: choseUserData.documentNumber,
          lastNameLat: choseUserData.lastNameLat,
          firstName: choseUserData.firstName,
          patronymName: choseUserData.patronymName,
          birthPlace: choseUserData.birthPlace,
          address: choseUserData.address,
          documentType: choseUserData.passportType,
          documentGivePlace: choseUserData.documentGivePlace,
          countryId: choseUserData.countryId,
          phoneNumber: choseUserData.phoneNumber,
          birthDate: new Date(choseUserData.birthDate).valueOf(),
          documentDateBegin: new Date(choseUserData.documentDateBegin).valueOf(),
          documentDateEnd: new Date(choseUserData.documentDateEnd).valueOf()
        };
      }
    }

  };

  const getCitizenshipField = () => {
    if (countries.value) {
      return countries.value.find(
        state => state.id === formValue.value.countryId
      )?.name;
    }
    else return '';
  };

  const submitForm = async () => {
    isLoading.value = true;

    formValue.value.citizenship = getCitizenshipField();

    let mergedPassportData: string;

    if (formValue.value.documentSeria && formValue.value.documentNumber) {
      mergedPassportData = `${formValue.value.documentSeria} ${formValue.value.documentNumber}`;
    }
    else {
      mergedPassportData = '';
    }

    const cashboxClientPayload: CashboxSellPayload = {
      ...props.rrnFields,
      isResident: formValue.value.isResident,
      phoneNumber: formValue.value.phoneNumber,
      documentSeria: formValue.value.documentSeria,
      documentGivePlace: formValue.value.documentGivePlace,
      documentDateEnd: formatDate(formValue.value.documentDateEnd, DATE_SYSTEM_FORMAT)!,
      documentNumber: formValue.value.documentNumber,
      lastNameLat: formValue.value.lastNameLat,
      patronymName: formValue.value.patronymName,
      documentDateBegin: formatDate(formValue.value.documentDateBegin, DATE_SYSTEM_FORMAT)!,
      address: formValue.value.address,
      birthDate: formatDate(formValue.value.birthDate, DATE_SYSTEM_FORMAT)!,
      birthPlace: formValue.value.birthPlace,
      documentTypeName: formValue.value.documentType,
      firstName: formValue.value.firstName,
      residencyCountry: formValue.value.countryId,
      document: mergedPassportData,
      citizenship: formValue.value.citizenship
    };

    const { error, item } = await submitCashboxSell(cashboxClientPayload);

    isLoading.value = false;

    if (error) return error;

    print({
      printable: item.receipts.base64PdfRu,
      type: 'pdf',
      base64: true
    });

    emit('pdfData', item.receipts.base64PdfRu);
  };

  onMounted(async () => {
    await fetchCountries();
    await fetchDocumentTypes();
  });

  return {
    isAmountValid,
    formValue,
    countries,
    documentTypes,
    currentUser,
    availableUsers,
    isLoading,
    validateAndEmitToNextStep,
    emitToPreviousStep,
    checkForFillingOfDocumentDataAndFetchClient,
    fillTheDataFromClient
  };
}
