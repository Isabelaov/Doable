import { DateTime } from 'luxon';
import { Progress } from '../../../core/domain/entities/progress.entity';
import { colors } from '../../assets/colors';

interface DateObject {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
  };
}

export function markDays(progress: Progress[]) {
  if (progress.length === 0) {
    return {};
  }

  const marked: DateObject = {};

  for (let i of progress) {
    const date = DateTime.fromJSDate(new Date(i.date)).toISODate();

    if (date) {
      marked[date] = { selected: true, selectedColor: colors.secondary };
    }
  }

  return marked;
}
