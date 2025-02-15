import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImp implements UserRepository {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BACKEND_URL,
      headers: { 'Content-Type': 'application/json' },
    });
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.response.use(
      response => response,
      error => {
        console.error({ ...error });

        if (error.response) {
          console.error(
            error,
            `API Error: ${error.response.status} - ${error.response.message}`,
          );
        } else {
          console.error(`Network Error: ${error.message}`, error);
        }

        if (error.response?.status === 401) {
          AsyncStorage.removeItem('AuthToken');
        }
        return Promise.reject(error);
      },
    );
  }

  public async register(data: any) {
    const response: AxiosResponse<any> = await this.instance.post('user', data);
    return response.data;
  }

  public async login(data: any) {
    const response: AxiosResponse<any> = await this.instance.post(
      'auth/login',
      data,
    );
    return response.data;
  }
}
