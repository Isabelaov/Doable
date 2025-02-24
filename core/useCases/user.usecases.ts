import { UserRepository } from '../domain/repositories/user.repository';

export const createUser = (repository: UserRepository, data: any) => {
  return repository.register(data);
};

export const loginUser = (repository: UserRepository, data: any) => {
  return repository.login(data);
};

export const getUser = (repository: UserRepository) => {
  return repository.get();
};
