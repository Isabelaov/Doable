import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { load } from '../redux/reducers/habits-slice';
import { HabitController } from '../../core/infrastructure/controllers/habit.controller';
import { HabitReq } from '../../core/domain/request/habit.request';
import { RootStack } from '../navigation/rootStack';
import { useNavigation } from '@react-navigation/native';
import { close } from '../redux/reducers/modal-slice';

export const useHabit = () => {
  const [loading, setLoading] = useState(false);

  const habits = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootStack>();

  const handleHabit = async (habit: HabitReq, id?: number) => {
    try {
      setLoading(true);

      if (id) {
        await HabitController.edit(habit, id);
      } else {
        await HabitController.createHabit(habit);
      }

      await loadHabits();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(close());
      setLoading(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      setLoading(true);

      await HabitController.delete(id);

      await loadHabits();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(close());
      setLoading(false);
    }
  };

  const loadHabits = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await HabitController.getAll();

      if (res) {
        dispatch(load(res));
      }
    } catch (error) {
      console.error(`Unable to load data: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  return {
    loading,
    habits,
    navigation,
    handleHabit,
    loadHabits,
    handleDelete,
  };
};
