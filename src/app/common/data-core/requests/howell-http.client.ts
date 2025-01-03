import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocalStorage } from '../../storage/local.storage';
import { HttpClientParams } from './services/http-client.model';

@Injectable({
  providedIn: 'root',
})
export class HowellHttpClient {
  constructor(private http: HttpClient, private local: LocalStorage) {}

  async blob(path: string, mime: string) {
    let options = this.getAuth();
    let response = await firstValueFrom(
      this.http.get(path, { ...options, responseType: 'blob' })
    );
    return new Blob([response], { type: mime });
  }

  buffer(path: string) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      fetch(path, {
        headers: {
          ...this.authorization,
        },
      }).then((response) => {
        resolve(response.arrayBuffer());
      });
    });
  }

  get<R>(path: string, config?: HttpClientParams) {
    let options = this.getAuth(config);
    return firstValueFrom(this.http.get<R>(path, options));
  }

  post<R>(path: string): Promise<R>;
  post<T>(path: string, data?: T, config?: HttpClientParams): Promise<T>;
  post<R, T>(path: string, data?: T, config?: HttpClientParams): Promise<R>;

  post<R, T = any>(path: string, data?: T, config?: HttpClientParams) {
    let options = this.getAuth(config);
    return firstValueFrom(this.http.post<R>(path, data, options));
  }
  put<R>(path: string): Promise<R>;
  put<T>(path: string, data?: T): Promise<T>;
  put<T, R>(path: string, data?: T): Promise<R>;
  put<R, T = any>(path: string, data?: T, config?: HttpClientParams) {
    let options = this.getAuth(config);
    return firstValueFrom(this.http.put<R>(path, data, options));
  }
  delete<R>(path: string, config?: HttpClientParams) {
    let options = this.getAuth(config);
    return firstValueFrom(this.http.delete<R>(path, options));
  }
  clear() {
    this.local.auth.clear();
  }
  //获取已授权的头部
  get authorization() {
    let info = this.local.auth.get();
    if (info) {
      return {
        Authorization: `Bearer ${info.token}`,
      };
    }
    throw new Error('未授权');
  }

  private getAuth(params?: HttpClientParams) {
    if (params) {
      params.headers = {
        ...params.headers,
        ...this.authorization,
      };
      return params;
    }
    return {
      headers: {
        ...this.authorization,
      },
    };
  }

  upload<R>(path: string, data: FormData, process: (x: number) => void) {
    let options = this.getAuth();
    return new Promise<R>((resolve) => {
      this.http
        .post(path, data, {
          ...options,
          reportProgress: true,
          observe: 'events',
        })
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            let percent = (event.loaded / (event.total ?? event.loaded)) * 100;
            process(percent);
          }
          if (event.type === HttpEventType.Response) {
            process(1);
            if (event.body) {
              resolve(event.body as R);
            }
          }
        });
    });
  }
}
