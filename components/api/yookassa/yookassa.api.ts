import { AxiosResponse } from 'axios';
import { HttpClient } from '../httpClient';
import { ICreatePaymentRes } from './types';

export class YookassaApi extends HttpClient {
  static async createPayment() {
    return this.http
      .post<ICreatePaymentRes>('/yookassa', {})
      .then(({ data }: AxiosResponse<ICreatePaymentRes>) => data);
  }
}
