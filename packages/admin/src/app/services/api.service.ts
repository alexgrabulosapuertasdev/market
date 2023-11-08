import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../shared/environments/environments.dev';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  protected get<T>(path: string): Observable<T> {
    return this.httpClient.get(`${environment.API_URL}/${path}`).pipe(map(res => res as T));
  }
}
