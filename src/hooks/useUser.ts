import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserController } from '../../core/infrastructure/user.controller';

export const useUser = () => {
  const [submitting, setSubmitting] = useState(false);

  const login = async (values: { email: string; password: string }) => {
    setSubmitting(true);
    try {
      const res = await UserController.login({ ...values });

      await AsyncStorage.setItem('token', res.token);
    } catch (error: any) {
      Alert.alert('Error', String(error));
    } finally {
      setSubmitting(false);
    }
  };

  const register = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    setSubmitting(true);
    try {
      await UserController.register({ ...values });
    } catch (error: any) {
      Alert.alert('Error', String(error));
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    setSubmitting(true);
    await AsyncStorage.removeItem('token');

    setSubmitting(false);
  };

  return { register, login, submitting, logout };
};
