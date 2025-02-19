import { useState } from 'react';
import { ProgressController } from '../../core/infrastructure/controllers/progress.controller';

export const useProgress = () => {
  const [loading, setLoading] = useState(false);

  const addProgress = async (habitId: number) => {
    try {
      setLoading(true);
      await ProgressController.createProgress({ habitId });
      console.log('Habit completed');
    } catch (error) {
      console.error(`Unable to add progress ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addProgress,
  };
};
