export const filterParams = [
  {
    label: 'Гибкие правила отмены',
    filterName: 'flexibleCancellation',
  },
  {
    label: 'Тип жилья',
    filterName: 'housingType',
  },
  {
    label: 'Цена',
    filterName: 'price',
  },
  {
    label: 'Мгновенное бронирование',
    filterName: 'instanceBooking',
  },
];

export const housingTypeOptions = [
  {
    value: 'EH',
    label: 'Жилье целиком',
    description: 'В вашем распоряжении жилье целиком',
  },
  {
    value: 'SR',
    label: 'Отдельная комната',
    description:
      'В вашем распоряжении комната, а остальные пространства вы разделите с другими',
  },
  {
    value: 'HR',
    label: 'Гостиничный номер',
    description:
      'Забронируйте отдельный или общий номер в бутик-отеле, хостеле и не только',
  },
  {
    value: 'SHR',
    label: 'Место в комнате',
    description: 'Вы будете не одни — например в комнате с соседями',
  },
];
