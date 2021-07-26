import React from 'react';
import { Button, Checkbox, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Field, Form, Formik } from 'formik';
import { housingTypeOptions } from '../../components/FiltrationArea/constants';
import Layout from '../../components/Layout';
import classes from '../../styles/homeCreation.module.scss';
import { fetchHomeCategories } from '../../api/categories';
import ImageDropzone from '../../components/ImageDropzone';

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

export default function HomeCreationPage({ categoryOptions }) {
  const initialValues = {
    title: '',
    location: '',
    categories: [],
    housingType: [],
    secondaryTitle: '',
    guestsCapacity: '',
    bedroomAmount: '',
    bedAmount: '',
    bathAmount: '',
    price: '',
    instanceBooking: false,
    flexibleCancellation: false,
    images: [],
  };

  const spreadGeneralMuiTreats = () => ({
    variant: 'outlined',
    color: 'secondary',
    as: TextField,
  });

  return (
    <Layout>
      <h2 className={classes.title}>Загрузить свое жилище</h2>

      <Formik initialValues={initialValues}>
        {({ handleChange, values, setFieldValue }) => (
          <Form className={classes.form}>
            <Field
              name="title"
              label="Наименование жилища"
              placeholder="Введите название"
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
              {...spreadGeneralMuiTreats()}
            />

            <Field
              name="location"
              label="Локация"
              placeholder="Село или город, облать или регион, страна"
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
              {...spreadGeneralMuiTreats()}
            />

            <Autocomplete
              multiple
              options={categoryOptions}
              onChange={(_, selectedCategories) => {
                setFieldValue('categories', selectedCategories);
              }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="secondary"
                  label="Выберите категорию(ии)"
                  placeholder="Категор(ия)(ии)"
                  className={classes.input}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />

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
            </ul>

            <Field
              name="secondaryTitle"
              label="Вторичное название (с адресом)"
              className={classes.input}
              disabled
              {...spreadGeneralMuiTreats()}
            />

            <div className={classes.amountValuesWrapper}>
              <Field
                name="capacityPeople"
                label="Лимит гостей"
                placeholder="Введите кол-во"
                className={[classes.input, classes.amountInput].join(' ')}
                InputLabelProps={{
                  shrink: true,
                }}
                {...spreadGeneralMuiTreats()}
              />

              <Field
                name="bedroomAmount"
                label="Количество спален"
                placeholder="Введите кол-во"
                className={[classes.input, classes.amountInput].join(' ')}
                InputLabelProps={{
                  shrink: true,
                }}
                {...spreadGeneralMuiTreats()}
              />

              <Field
                name="bedAmount"
                label="Количество кроватей"
                placeholder="Введите кол-во"
                className={[classes.input, classes.amountInput].join(' ')}
                InputLabelProps={{
                  shrink: true,
                }}
                {...spreadGeneralMuiTreats()}
              />

              <Field
                name="bathAmount"
                label="Количество ванн"
                placeholder="Введите кол-во"
                className={[classes.input, classes.amountInput].join(' ')}
                InputLabelProps={{
                  shrink: true,
                }}
                {...spreadGeneralMuiTreats()}
              />
            </div>

            <Field
              name="price"
              label="Цена за одну ночь (₽)"
              placeholder="Введите цену (₽)"
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
              {...spreadGeneralMuiTreats()}
            />

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

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Опубликовать
            </Button>

            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
