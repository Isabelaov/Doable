import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, View, Text, ActivityIndicator } from 'react-native';
import { ContainerStyles, TextStyles } from '../assets/styles';
import { Button, Input } from '../components';
import { RootStack } from '../navigation/rootStack';
import { colors } from '../assets/colors';
import { registerValidationSchema } from '../utils/validation/register.validation';

type NavigationProp = NativeStackNavigationProp<RootStack, 'Register'>;

interface Props {
  navigation: NavigationProp;
}

export const RegisterScreen = ({ navigation }: Props) => {
  // const { register, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (values: any) => {
    setSubmitting(true);
    try {
      // await register(values);
      console.log({ values });

      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', String(error));
    } finally {
      setSubmitting(false);
    }
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
            phone: '',
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
