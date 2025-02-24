import { User } from '../entities/user.entity';

export interface UserRepository {
  register(data: any): Promise<any>;
  login(data: any): Promise<any>;
  get(): Promise<User>;
}
