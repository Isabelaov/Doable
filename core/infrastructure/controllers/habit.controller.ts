import { Alert } from 'react-native';
import {
  createHabit,
  deleteHabit,
  editHabit,
  getHabits,
} from '../../useCases/habit.usecases';
import { HabitRepositoryImp } from '../implementations/habit.implementation';

const habitRepository = new HabitRepositoryImp();

export class HabitController {
  static async create(data: any) {
    try {
      return await createHabit(habitRepository, data);
    } catch (error) {
      console.log(error);
      Alert.alert(String(error));
    }
  }

  static async edit(data: any) {
    try {
      return await editHabit(habitRepository, data);
    } catch (error) {
      console.log(error);
      Alert.alert(String(error));
    }
  }

  static async getAll() {
    try {
      return await getHabits(habitRepository);
    } catch (error) {
      console.log(error);
      Alert.alert(String(error));
    }
  }

  static async delete(id: number) {
    try {
      return await deleteHabit(habitRepository, id);
    } catch (error) {
      console.log(error);
      Alert.alert(String(error));
    }
  }
}
