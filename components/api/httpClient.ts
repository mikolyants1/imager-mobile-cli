import { HttpInstance } from '@/utils/httpInstance';
import { AxiosInstance } from 'axios';

export abstract class HttpClient {
  protected static readonly http: AxiosInstance = HttpInstance.getClient();
}
