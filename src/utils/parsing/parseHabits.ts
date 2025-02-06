import { Habit } from '../../../core/domain/entities/habit.entity';
import { HabitReq } from '../../../core/domain/request/habit.request';

const parseHabit = (habit: Habit): HabitReq => {
  return {
    ...habit,
  };
};

export default parseHabit;
