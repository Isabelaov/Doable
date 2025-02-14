import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { ProgressController } from '../../core/infrastructure/controllers/progress.controller';
import { load } from '../redux/reducers/progress-slice';
import { Frequencies } from '../../core/enums/frequency.enum';
import { Habit } from '../../core/domain/entities/habit.entity';
import { Progress } from '../../core/domain/entities/progress.entity';

export const useProgress = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const progress = useSelector((state: RootState) => state.progress.progress);

  const addProgress = async (habitId: number) => {
    try {
      setLoading(true);
      await ProgressController.createProgress({ habitId });
      await loadProgress();
    } catch (error) {
      console.error(`Unable to add progress ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ProgressController.getProgress();

      if (res) {
        dispatch(load(res));
      }
    } catch (error) {
      console.error(`Unable to load progress ${error}`);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const getFromHabit = async (habitId: number) => {
    try {
      setLoading(true);
      return ProgressController.getProgressFromHabit(habitId);
    } catch (error) {
      console.error(`Unable to get progress from ID ${habitId} ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const habitCompleted = async (habit: Habit) => {
    try {
      setLoading(true);
      const res: Progress[] | undefined = await getFromHabit(habit.id);

      if (!res || res?.length < 1) {
        return false;
      }

      const now = new Date();

      for (const item of res) {
        const date = new Date(item.date);

        switch (habit.frequency) {
          case Frequencies.daily:
            return now.toDateString() === date.toDateString();

          case Frequencies.weekly:
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            return date >= startOfWeek && date <= endOfWeek;

          case Frequencies.monthly:
            return (
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear()
            );
        }
      }

      return false;
    } catch (error) {
      console.error(`Unable to make calc from ID ${habit.id} ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    progress,
    addProgress,
    loadProgress,
    getFromHabit,
    habitCompleted,
  };
};
