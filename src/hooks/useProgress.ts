import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { ProgressController } from '../../core/infrastructure/controllers/progress.controller';

export const useProgress = () => {
  const [loading, setLoading] = useState(false);
  const progress = useSelector((state: RootState) => state.progress.progress);

  const addProgress = async (habitId: number) => {
    try {
      setLoading(true);
      await ProgressController.createProgress({ habitId });
      console.log('habit completed');
    } catch (error) {
      console.error(`Unable to add progress ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    progress,
    addProgress,
  };
};
