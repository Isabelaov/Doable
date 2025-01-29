import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import { ContainerStyles, TextStyles } from '../assets/styles';
import { Input, Button } from '../components';
import { RootStack } from '../navigation/rootStack';
import { loginValidationSchema } from '../utils/validation/login.validation';
import { useUser } from '../hooks/useUser';

type NavigationProp = NativeStackNavigationProp<RootStack, 'Login'>;

interface Props {
  navigation: NavigationProp;
}

export const LoginScreen = ({ navigation }: Props) => {
  const { login, submitting } = useUser();
  const handleLogin = async (values: { email: string; password: string }) => {
    await login({ ...values });
    navigation.navigate('Home');
  };

  return (
    <View style={ContainerStyles.formContainer}>
      <Text style={TextStyles.title}>
        Welcome <Text style={TextStyles.titleSecondary}>Back!</Text>
      </Text>
      <Formik
        initialValues={{
          email: 'jane.doe@email.com',
          password: 'Password12.3!',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}>
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
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email ? errors.email : undefined}
            />

            <Input
              placeholder="Password"
              secureTextEntry
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              value={values.password}
              error={touched.password ? errors.password : undefined}
            />

            <View style={ContainerStyles.bySide}>
              <Button
                text="Log In"
                onPress={() => handleSubmit()}
                isLoading={submitting}
              />

              <Button
                text="Register"
                backgroundPrimary={false}
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
