import { HttpClient } from '../httpClient';

export class ImageApi extends HttpClient {
  static async actionWithImage(formData: FormData, path: string) {
    return this.http
      .post(`image/${path}`, formData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data, headers }) => {
        const blob = new Blob([data], { type: headers['content-type'] });
        return URL.createObjectURL(blob);
      });
  }
}
