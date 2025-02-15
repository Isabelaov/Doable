import { UserRepositoryImp } from '../implementations/user.implementation';
import { createUser, loginUser } from '../../useCases/user.usecases';
import { Alert } from 'react-native';

const userRepository = new UserRepositoryImp();

export class UserController {
  static async register(data: any) {
    try {
      return await createUser(userRepository, data);
    } catch (err) {
      console.error(err);
      Alert.alert(String(err));
    }
  }

  static async login(data: any) {
    try {
      return await loginUser(userRepository, data);
    } catch (err) {
      console.error(err);
      Alert.alert(String(err));
    }
  }
}
