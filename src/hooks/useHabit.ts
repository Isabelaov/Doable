import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { load } from '../redux/reducers/habits-slice';
import { HabitController } from '../../core/infrastructure/controllers/habit.controller';
import { HabitReq } from '../../core/domain/request/habit.request';
import { Alert, ModalProps } from 'react-native';
import { RootStack } from '../navigation/rootStack';
import { useNavigation } from '@react-navigation/native';

export type ItemModalProps = ModalProps & {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  habitId: number | undefined | null;
  setHabitId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const useHabit = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const navigation = useNavigation<RootStack>();

  const handleHabit = async (habit: HabitReq, id?: number) => {
    try {
      setLoading(true);

      if (id) {
        await HabitController.edit(habit, id);
      } else {
        await HabitController.createHabit(habit);
      }
      Alert.alert('Habit created');
      await loadHabits();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setModalVisible(false);
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

  const handleDelete = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      await HabitController.delete(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    modalVisible,
    habits,
    navigation,
    setModalVisible,
    handleHabit,
    loadHabits,
    handleDelete,
  };
};
