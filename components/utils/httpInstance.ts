import axios, { AxiosInstance } from 'axios';

export class HttpInstance {
  private static httpClient: AxiosInstance;

  public static getClient() {
    if (!this.httpClient) {
      this.httpClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      });
      this.httpClient.interceptors.request.use(async config => {
        const accessToken = await getCookie('access_token');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          delete config.headers.Authorization;
        }
        return config;
      });
    }
    return this.httpClient;
  }
}
