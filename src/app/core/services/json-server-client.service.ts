import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonServerApi } from './json-server.config';

@Injectable()
export class JsonServerClientService {
  constructor(
    @Inject(JsonServerApi) private readonly url: string,
    private http: HttpClient
  ) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.url + endpoint);
  }

  post<T>(endpoint: string, object: T): Observable<T> {
    const body = this.getRequestBody(object);
    const options = this.getRequestOptions();

    return this.http.post<T>(this.url + endpoint, body, options);
  }

  put<T>(endpoint: string, object: T): Observable<T> {
    const body = this.getRequestBody(object);
    const options = this.getRequestOptions();

    return this.http.put<T>(this.url + endpoint, body, options);
  }

  delete(endpoint: string): Observable<{}> {
    return this.http.delete<{}>(this.url + endpoint);
  }

  private getRequestOptions(): { [option: string]: any } {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  private getRequestBody(model: any): any {
    return JSON.stringify(model);
  }
}
