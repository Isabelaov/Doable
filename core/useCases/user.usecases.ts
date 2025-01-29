import { UserRepository } from '../domain/user.repository';

export const createUser = (repository: UserRepository, data: any) => {
  return repository.register(data);
};

export const loginUser = (repository: UserRepository, data: any) => {
  return repository.login(data);
};
