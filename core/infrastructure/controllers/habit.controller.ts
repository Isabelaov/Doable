import { Alert } from 'react-native';
import {
  createHabit,
  deleteHabit,
  editHabit,
  getHabits,
} from '../../useCases/habit.usecases';
import { HabitRepositoryImp } from '../implementations/habit.implementation';
import { HabitReq } from '../../domain/request/habit.request';

const habitRepository = new HabitRepositoryImp();

export class HabitController {
  static async create(data: HabitReq) {
    try {
      return await createHabit(habitRepository, data);
    } catch (error) {
      console.log(error);
      Alert.alert(String(error));
    }
  }

  static async edit(data: HabitReq, id: number) {
    try {
      return await editHabit(habitRepository, data, id);
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
