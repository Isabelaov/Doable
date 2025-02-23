import { Alert } from 'react-native';
import {
  createHabit,
  deleteDB,
  deleteHabit,
  editHabit,
  getHabits,
} from '../../useCases/habit.usecases';
import { HabitRepositoryImp } from '../implementations/habit.implementation';
import { HabitReq } from '../../domain/request/habit.request';

export class HabitController {
  private static habitRepository = new HabitRepositoryImp();

  static async createHabit(data: HabitReq) {
    try {
      return await createHabit(this.habitRepository, data);
    } catch (error) {
      console.error(error);
      Alert.alert(String(error));
    }
  }

  static async edit(data: HabitReq, id: number) {
    try {
      return await editHabit(this.habitRepository, data, id);
    } catch (error) {
      console.error(error);
      Alert.alert(String(error));
    }
  }

  static async getAll() {
    try {
      return await getHabits(this.habitRepository);
    } catch (error) {
      console.error(error);
      Alert.alert(String(error));
    }
  }

  static async delete(id: number) {
    try {
      return await deleteHabit(this.habitRepository, id);
    } catch (error) {
      console.error(error);
      Alert.alert(String(error));
    }
  }

  static async deleteDB() {
    try {
      return await deleteDB(this.habitRepository);
    } catch (error: any) {
      console.error('Error deleting DB', error.message);
    }
  }
}
