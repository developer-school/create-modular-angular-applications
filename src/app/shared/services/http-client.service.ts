import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  API_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(`${this.API_URL}${path}`);
  }

  post<T>(path: string, body: T) {
    return this.http.post<T>(`${this.API_URL}${path}`, body);
  }

  put<T>(path: string, body: T) {
    console.log(`${this.API_URL}${path}`);
    return this.http.put<T>(`${this.API_URL}${path}`, body);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(`${this.API_URL}${path}`);
  }
}
