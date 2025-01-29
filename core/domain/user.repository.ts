export interface UserRepository {
  register(data: any): Promise<any>;
  login(data: any): Promise<any>;
}
