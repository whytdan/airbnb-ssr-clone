import React from 'react';
import * as Yup from 'yup';
import { Button, Checkbox, FormControl, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { housingTypeOptions } from '../../components/FiltrationArea/constants';
import Layout from '../../components/Layout';
import classes from '../../styles/homeCreation.module.scss';
import { fetchHomeCategories } from '../../api/categories';
import ImageDropzone from '../../components/ImageDropzone';
import TextError from '../../components/TextError';
import Head from 'next/head';

export async function getStaticProps() {
  const categories = await fetchHomeCategories();
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    label: category.title,
    value: category.slug,
  }));

  return {
    props: {
      categoryOptions,
    },
  };
}

interface ICategoryOption {
  id: number;
  label: string;
  value: string;
}

export default function HomeCreationPage({ categoryOptions }) {
  const initialValues = {
    title: '',
    location: '',
    categories: [],
    housingType: [],
    guestsCapacity: '',
    bedroomAmount: '',
    bedAmount: '',
    bathAmount: '',
    price: '',
    instanceBooking: false,
    flexibleCancellation: false,
    images: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Обязательное поле!'),
    location: Yup.string().required('Обязательное поле!'),
    categories: Yup.array()
      .min(1, 'Выберите как минимум одну категорию!')
      .required('Обязательное поле!'),
    housingType: Yup.array()
      .min(1, 'Выберите как минимум один тип!')
      .required('Обязательное поле!'),
    guestsCapacity: Yup.number()
      .typeError('Значение должно быть числом!')
      .required('Обязательное поле!'),
    bedroomAmount: Yup.number()
      .typeError('Значение должно быть числом!')
      .required('Обязательное поле!'),
    bedAmount: Yup.number()
      .typeError('Значение должно быть числом!')
      .required('Обязательное поле!'),
    bathAmount: Yup.number()
      .typeError('Значение должно быть числом!')
      .required('Обязательное поле!'),
    price: Yup.number()
      .typeError('Значение должно быть числом!')
      .required('Обязательное поле!')
      .moreThan(0, 'Бесплатно?'),
    images: Yup.array()
      .min(1, 'Выберите как минимум одно изображение!')
      .required('Обязательное поле!'),
  });

  const onSubmit = (values, { resetForm }) => {
    alert(JSON.stringify(values, null, 2));
    resetForm();
  };

  const spreadGeneralMuiTreats = () => ({
    variant: 'outlined',
    color: 'secondary',
    as: TextField,
  });

  return (
    <Layout home={false}>
      <Head>
        <title>Загрузить свое жилище</title>
      </Head>
      <h2 className={classes.title}>Загрузить свое жилище</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form className={classes.form}>
            <FormControl className={classes.input}>
              <Field
                name="title"
                label="Наименование жилища"
                placeholder="Введите название"
                InputLabelProps={{
                  shrink: true,
                }}
                {...spreadGeneralMuiTreats()}
              />
              <ErrorMessage component={TextError} name="title" />
            </FormControl>

            <FormControl className={classes.input}>
              <Field
                name="location"
                label="Локация"
                placeholder="Село или город, облать или регион, страна"
                InputLabelProps={{
                  shrink: true,
                }}
                {...spreadGeneralMuiTreats()}
              />
              <ErrorMessage component={TextError} name="location" />
            </FormControl>

            <FormControl className={classes.input}>
              <Autocomplete
                multiple
                options={categoryOptions}
                onChange={(_, selectedCategories) => {
                  setFieldValue('categories', selectedCategories);
                }}
                getOptionLabel={(option: ICategoryOption) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    color="secondary"
                    label="Выберите категорию(ии)"
                    placeholder="Категор(ия)(ии)"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />

              <ErrorMessage component={TextError} name="categories" />
            </FormControl>

            <ul className={classes.housingTypeWrapper}>
              {housingTypeOptions.map((type) => (
                <li className={classes.housingType} key={type.value}>
                  <Checkbox
                    checked={values.housingType.includes(type.value)}
                    onChange={() => {
                      const currentHousingType = values.housingType;
                      const houseType = type.value;
                      if (currentHousingType.includes(houseType)) {
                        setFieldValue(
                          'housingType',
                          currentHousingType.filter((el) => el !== houseType)
                        );
                      } else {
                        setFieldValue('housingType', [
                          ...currentHousingType,
                          houseType,
                        ]);
                      }
                    }}
                  />
                  <div>
                    <label>{type.label}</label>
                    <p>{type.description}</p>
                  </div>
                </li>
              ))}
              <ErrorMessage component={TextError} name="housingType" />
            </ul>

            <div className={classes.amountValuesWrapper}>
              <FormControl
                className={[classes.input, classes.amountInput].join(' ')}
              >
                <Field
                  name="guestsCapacity"
                  label="Лимит гостей"
                  placeholder="Введите кол-во"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...spreadGeneralMuiTreats()}
                />
                <ErrorMessage component={TextError} name="guestsCapacity" />
              </FormControl>

              <FormControl
                className={[classes.input, classes.amountInput].join(' ')}
              >
                <Field
                  name="bedroomAmount"
                  label="Количество спален"
                  placeholder="Введите кол-во"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...spreadGeneralMuiTreats()}
                />
                <ErrorMessage component={TextError} name="bedroomAmount" />
              </FormControl>

              <FormControl
                className={[classes.input, classes.amountInput].join(' ')}
              >
                <Field
                  name="bedAmount"
                  label="Количество кроватей"
                  placeholder="Введите кол-во"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...spreadGeneralMuiTreats()}
                />
                <ErrorMessage component={TextError} name="bedAmount" />
              </FormControl>

              <FormControl
                className={[classes.input, classes.amountInput].join(' ')}
              >
                <Field
                  name="bathAmount"
                  label="Количество ванн"
                  placeholder="Введите кол-во"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...spreadGeneralMuiTreats()}
                />
                <ErrorMessage component={TextError} name="bathAmount" />
              </FormControl>
            </div>

            <FormControl className={classes.input}>
              <Field
                name="price"
                label="Цена за одну ночь (₽)"
                placeholder="Введите цену (₽)"
                InputLabelProps={{
                  shrink: true,
                }}
                {...spreadGeneralMuiTreats()}
              />
              <ErrorMessage component={TextError} name="price" />
            </FormControl>

            <FormGroup row style={{ marginBottom: 30 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.instanceBooking}
                    onChange={handleChange('instanceBooking')}
                  />
                }
                label="Мгновенное бронирование"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.flexibleCancellation}
                    onChange={handleChange('flexibleCancellation')}
                  />
                }
                label="Гибкие правила отмены"
              />
            </FormGroup>

            <ImageDropzone
              buttonText={'Загрузить изображения'}
              setFieldValue={setFieldValue}
              name="images"
              formikImages={values.images}
            />

            <ErrorMessage component={TextError} name="images" />

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              type="submit"
            >
              Опубликовать
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
