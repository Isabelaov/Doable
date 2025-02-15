import { DateTime } from 'luxon';
import { Habit } from '../../../core/domain/entities/habit.entity';
import { Frequencies } from '../../../core/enums/frequency.enum';

export function isCompleted(habit: Habit): boolean {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (habit.progress.length === 0) {
    return false;
  }

  for (let i of habit.progress) {
    const now = DateTime.now().setZone(timezone);
    const progressDate = DateTime.fromSQL(i.date).setZone(timezone);

    switch (habit.frequency) {
      case Frequencies.daily:
        return now.toString() === progressDate.toString();

      case Frequencies.weekly:
        const startOfWeek = now.startOf('week');
        const endOfWeek = now.endOf('week');

        return +startOfWeek <= +progressDate && +progressDate <= +endOfWeek;

      case Frequencies.monthly:
        return (
          progressDate.month === now.month && progressDate.year === now.year
        );
    }
  }

  return false;
}
