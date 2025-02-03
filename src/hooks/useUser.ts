import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserController } from '../../core/infrastructure/controllers/user.controller';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/rootStack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { login, logout } from '../redux/reducers/auth-slice';

export const useUser = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch<AppDispatch>();

  const loginUser = async (values: { email: string; password: string }) => {
    setSubmitting(true);
    try {
      const res = await UserController.login({ ...values });
      dispatch(login());
      await AsyncStorage.setItem('token', res.token);
      navigation.navigate('Home');
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

  const logoutUser = async () => {
    setSubmitting(true);
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.navigate('Login');
    setSubmitting(false);
  };

  return { register, loginUser, submitting, logoutUser };
};
