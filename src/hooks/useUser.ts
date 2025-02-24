import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserController } from '../../core/infrastructure/controllers/user.controller';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/rootStack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { login, logout, setUser } from '../redux/reducers/auth-slice';
import { HabitController } from '../../core/infrastructure/controllers/habit.controller';

export const useUser = () => {
  const [submitting, setSubmitting] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
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

  const updateUser = async () => {
    setSubmitting(true);

    setSubmitting(false);
  };

  const logoutUser = async () => {
    setSubmitting(true);
    await AsyncStorage.removeItem('token');
    await HabitController.deleteDB();
    dispatch(setUser());
    dispatch(logout());
    navigation.navigate('Login');
    setSubmitting(false);
  };

  const getUser = useCallback(async () => {
    setSubmitting(true);
    const response = await UserController.get();
    console.log({ response });

    if (response) {
      dispatch(setUser(response));
    }
    setSubmitting(false);
  }, [dispatch]);

  return {
    submitting,
    user,
    register,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
  };
};
