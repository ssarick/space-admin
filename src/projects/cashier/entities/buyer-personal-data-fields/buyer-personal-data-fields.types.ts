export interface BuyerPersonalDataFormProps {
  lastNameLat: string,
  firstName: string,
  patronymName: string,
  birthDate: null | number,
  birthPlace: string,
  address: string
}

export interface BuyerPersonalDataFormEmits {
  (event: 'update:lastNameLat', payload: BuyerPersonalDataFormProps['lastNameLat'])
  (event: 'update:firstName', payload: BuyerPersonalDataFormProps['firstName'])
  (event: 'update:patronymName', payload: BuyerPersonalDataFormProps['patronymName'])
  (event: 'update:birthDate', payload: BuyerPersonalDataFormProps['birthDate'])
  (event: 'update:birthPlace', payload: BuyerPersonalDataFormProps['birthPlace'])
  (event: 'update:address', payload: BuyerPersonalDataFormProps['address'])
}
