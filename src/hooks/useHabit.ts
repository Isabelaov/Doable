import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { load } from '../redux/reducers/habits-slice';
import { HabitController } from '../../core/infrastructure/controllers/habit.controller';
import { HabitReq } from '../../core/domain/request/habit.request';
import { Alert } from 'react-native';

export const useHabit = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const loadHabits = async () => {
    try {
      setLoading(true);
      const res = await HabitController.getAll();

      if (res) {
        const parsed = JSON.parse(res);
        dispatch(load(parsed));
      }
    } catch (error) {
      console.error(`Unable to parse data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const createHabit = async (data: HabitReq) => {
    try {
      setLoading(true);
      await HabitController.create(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error creating habit:', String(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, loadHabits, createHabit };
};
