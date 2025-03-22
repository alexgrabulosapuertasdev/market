import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from './api.service';
import { API_URL } from '../shared/enum/api-url.enum';
import { LoginCredentials } from '../shared/interfaces/login/login-credentials.interface';
import { LoginResponse } from '../shared/interfaces/login/login-response.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor(
    protected override httpClient: HttpClient,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {
    super(httpClient);
  }

  login(credentials: LoginCredentials): void {
    this.post<LoginResponse>(`${API_URL.AUTH}/login`, credentials).subscribe({
      next: ({ token }) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(`Error: ${error}`);
        this.messageService.add({
          severity: 'error',
          summary: 'Iniciar sesión',
          detail: 'Error al iniciar sesión',
        });
      },
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRoles(): string[] {
    const token = this.getToken();

    if (!token) {
      return [];
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role ?? [];
  }
}
