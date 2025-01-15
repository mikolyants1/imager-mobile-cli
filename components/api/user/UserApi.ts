import { IApiUserArgs } from '@/types/api';
import { HttpClient } from '../httpClient';
import { ICreateUserRes } from './types';
import { AxiosResponse } from 'axios';
import { IUser } from '@/types/models';

export class UserApi extends HttpClient {
  static async createUser(body: IApiUserArgs) {
    return this.http
      .post<ICreateUserRes>('/user', body)
      .then(({ data }: AxiosResponse<ICreateUserRes>) => data);
  }

  static async getUser() {
    return this.http.get<IUser>('/user').then(({ data }: AxiosResponse<IUser>) => data);
  }
}
