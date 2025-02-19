import { Alert } from 'react-native';
import { ProgressReq } from '../../domain/request/progress.request';
import {
  createProgress,
  getProgress,
  getProgressFromHabit,
} from '../../useCases/progress.usecases';
import { ProgressRepositoryImp } from '../implementations/progress.implementation';
export class ProgressController {
  private static repository = new ProgressRepositoryImp();

  static async createProgress(data: ProgressReq) {
    try {
      return await createProgress(this.repository, data);
    } catch (error: any) {
      console.error({ ...error });
      Alert.alert(String(error));
    }
  }

  static async getProgress() {
    try {
      return await getProgress(this.repository);
    } catch (error: any) {
      console.error({ ...error });
      Alert.alert(String(error));
    }
  }

  static async getProgressFromHabit(habitId: number) {
    try {
      return await getProgressFromHabit(this.repository, habitId);
    } catch (error: any) {
      console.error({ ...error });
      Alert.alert(String(error));
    }
  }
}
