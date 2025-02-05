import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { load } from '../redux/reducers/habits-slice';
import { HabitController } from '../../core/infrastructure/controllers/habit.controller';
import { HabitReq } from '../../core/domain/request/habit.request';
import { Alert, ModalProps } from 'react-native';
import { RootStack } from '../navigation/rootStack';
import { useNavigation } from '@react-navigation/native';
import { Habit } from '../../core/domain/entities/habit.entity';

export type ItemModalProps = ModalProps & {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  habitId: number | undefined | null;
  setHabitId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const parseHabit = (habit: Habit): HabitReq => {
  return {
    ...habit,
  };
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
        await HabitController.create(habit);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadHabits = async (): Promise<void> => {
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

  const createHabit = async (data: HabitReq): Promise<void> => {
    try {
      setLoading(true);
      await HabitController.create(data);
      await loadHabits();
    } catch (error) {
      console.error(error);
      Alert.alert('Error creating habit:', String(error));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    modalVisible,
    setModalVisible,
    handleHabit,
    loadHabits,
    createHabit,
  };
};
