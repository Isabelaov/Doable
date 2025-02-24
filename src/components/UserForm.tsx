import React from 'react';
import { Formik } from 'formik';
import {
  registerValidationSchema,
  updateValidationSchema,
} from '../utils/validation';
import { Input } from './Input';
import { Button } from '.';
import { User } from '../../core/domain/entities/user.entity';
import { useUser } from '../hooks';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/rootStack';

export interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const UserForm = ({ user }: { user?: User }) => {
  const { register, submitting } = useUser();
  const navigation = useNavigation<NavigationProps>();

  const handle = async (values: FormValues) => {
    console.log({ values });

    if (user) {
    } else {
      const { confirmPassword, ...data } = values;
      await register({ ...data });
      navigation.navigate('Login');
    }
  };

  return (
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
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
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
  );
};
