import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import { ContainerStyles, TextStyles } from '../assets/styles';
import { Input, Button } from '../components';
import { RootStack } from '../navigation/rootStack';
import { loginValidationSchema } from '../utils/validation/login.validation';

type NavigationProp = NativeStackNavigationProp<RootStack, 'Login'>;

interface Props {
  navigation: NavigationProp;
}

export const LoginScreen = ({ navigation }: Props) => {
  return (
    <View style={ContainerStyles.formContainer}>
      <Text style={TextStyles.title}>
        Welcome <Text style={TextStyles.titleSecondary}>Back!</Text>
      </Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={() => console.log('uwu')}>
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
              <Button text="Log In" onPress={() => handleSubmit()} />

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

// const { login, loading } = useAuth();
// const [submitting, setSubmitting] = useState(false);

// const handleLogin = async (values: { email: string; password: string }) => {
//   setSubmitting(true);
//   try {
//     await login(values.email, values.password);

//     navigation.replace('Login', { screen: '' });
//   } catch (error: any) {
//     Alert.alert('Error', String(error));
//   } finally {
//     setSubmitting(false);
//   }
// };
