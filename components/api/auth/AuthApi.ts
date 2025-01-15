import { AxiosResponse } from 'axios';
import { HttpClient } from '../httpClient';
import { IAuthUserRes, IVerifyTokenArgs, IVerifyTokenRes } from './types';
import { IApiUserArgs } from '@/types/api';
import { setCookie } from '@/utils/cookie';

export class AuthApi extends HttpClient {
  static async authUser(body: IApiUserArgs) {
    return this.http
      .post<IAuthUserRes>('/auth/user', body)
      .then(async ({ data }: AxiosResponse<IAuthUserRes>) => {
        await setCookie('access_token', data.token);
        await setCookie('is_premium', `${data.user.is_premium}`);
        await setCookie('login', data.user.login);
        return data;
      });
  }

  static async verifyToken(body: IVerifyTokenArgs) {
    return this.http
      .post<IVerifyTokenRes>('/auth/token', body)
      .then(({ data }: AxiosResponse<IVerifyTokenRes>) => data);
  }
}
