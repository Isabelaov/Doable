import { User } from '../entities/user.entity';
import { RegisterReq } from '../request/user.request';

export interface UserRepository {
  register(data: RegisterReq): Promise<any>;
  login(data: Omit<RegisterReq, 'name'>): Promise<any>;
  get(): Promise<User>;
  update(data: Partial<RegisterReq>, id: number): Promise<string>;
}
