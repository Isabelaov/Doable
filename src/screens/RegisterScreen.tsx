import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ContainerStyles, TextStyles } from '../assets/styles';
import { Button, Input } from '../components';
import { RootStack } from '../navigation/rootStack';
import { colors } from '../assets/colors';
import { registerValidationSchema } from '../utils/validation/register.validation';
import { useUser } from '../hooks/useUser';

type NavigationProp = NativeStackNavigationProp<RootStack, 'Register'>;

interface Props {
  navigation: NavigationProp;
}

export const RegisterScreen = ({ navigation }: Props) => {
  const { register, submitting } = useUser();

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    await register({ ...values });
    navigation.navigate('Login');
  };

  return (
    <View style={ContainerStyles.formContainer}>
      <Text style={TextStyles.titleSecondary}>
        Get <Text style={TextStyles.title}>Started</Text>
      </Text>

      {submitting ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegister}>
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
                text="Join Us"
                backgroundPrimary={false}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
      )}
    </View>
  );
};
