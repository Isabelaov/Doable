import React from 'react';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import {
  registerValidationSchema,
  updateValidationSchema,
} from '../utils/validation';
import { Button, Input } from '.';
import { useUser } from '../hooks';
import { NavigationProps } from '../navigation/rootStack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { openCalendar, sendData } from '../redux/reducers';
import { ConfirmModal } from './ConfirmModal';

export interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const UserForm = () => {
  const { register, submitting } = useUser();
  const navigation = useNavigation<NavigationProps>();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  console.log({ user });

  const handle = async (values: FormValues) => {
    console.log({ values });

    if (user) {
      dispatch(openCalendar());
      dispatch(sendData(values));
    } else {
      const data: Omit<FormValues, 'confirmPassword'> = values;
      await register({ ...data });
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: user?.name || '',
          email: user?.email || '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={
          user ? updateValidationSchema : registerValidationSchema
        }
        onSubmit={handle}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Input
              placeholder="Name"
              onChangeText={handleChange('name')}
              value={values.name}
              onBlur={handleBlur('name')}
              error={touched.name ? errors.name : ''}
            />

            <Input
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email ? errors.email : ''}
            />

            <Input
              placeholder="Password"
              secureTextEntry
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              value={values.password}
              error={touched.password ? errors.password : undefined}
            />

            <Input
              placeholder="Confirm password"
              secureTextEntry
              onBlur={handleBlur('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              error={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
            />

            <Button
              text={user ? 'Save' : 'Join Us'}
              backgroundPrimary={false}
              onPress={() => handleSubmit()}
              disabled={submitting}
            />
          </>
        )}
      </Formik>

      <ConfirmModal />
    </>
  );
};
