export const filterParams = [
  {
    label: 'Гибкие правила отмены',
    value: 'flexibleCancellation',
  },
  {
    label: 'Тип жилья',
    value: 'housingType',
  },
  {
    label: 'Цена',
    value: 'price',
  },
  {
    label: 'Мгновенное бронирование',
    value: 'instanceBooking',
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
