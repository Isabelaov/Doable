import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserController } from '../../core/infrastructure/controllers/user.controller';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/rootStack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { login, logout, setUser } from '../redux/reducers/auth-slice';
import { HabitController } from '../../core/infrastructure/controllers/habit.controller';
import { closeCalendar, deleteData } from '../redux/reducers';
import { Alert } from 'react-native';
import { FormValues } from '../components';
import { filterValues } from '../utils/calcs/filterObj';

export const useUser = () => {
  const [submitting, setSubmitting] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const data = useSelector((state: RootState) => state.update.formData);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch<AppDispatch>();

  const loginUser = async (values: { email: string; password: string }) => {
    setSubmitting(true);
    const res = await UserController.login({ ...values });
    dispatch(login());
    await AsyncStorage.setItem('token', res.token);
    navigation.navigate('Home');
    setSubmitting(false);
  };

  const register = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    setSubmitting(true);
    await UserController.register({ ...values });
    setSubmitting(false);
  };

  const updateUser = async (password: string) => {
    setSubmitting(true);
    const res = await UserController.login({ email: user!.email, password });

    if (res && user && data) {
      const sendData = filterValues<FormValues>(data);

      console.log({ sendData });

      await UserController.update(sendData, user.id);
      await getUser();
    } else {
      Alert.alert('No data provided');
    }

    dispatch(deleteData());
    dispatch(closeCalendar());
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

    if (response) {
      dispatch(setUser(response));
    }
    setSubmitting(false);
  }, [dispatch]);

  return {
    submitting,
    register,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
  };
};
