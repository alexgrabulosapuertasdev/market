import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from './api.service';
import { API_URL } from '../shared/enum/api-url.enum';
import { LoginCredentials } from '../shared/interfaces/login/login-credentials.interface';
import { LoginResponse } from '../shared/interfaces/login/login-response.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { USER_ROLE } from '../shared/enum/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private readonly isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected override httpClient: HttpClient,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {
    super(httpClient);

    this.getUserRole().subscribe((role) => {
      this.isLogged$.next(Boolean(role));
    });
  }

  login(credentials: LoginCredentials): void {
    this.post<LoginResponse>(`${API_URL.AUTH}/login`, credentials).subscribe({
      next: () => {
        this.isLogged$.next(true);
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

  getUserRole(): Observable<USER_ROLE | undefined> {
    return this.get<{ role: USER_ROLE }>(`${API_URL.AUTH}/me`).pipe(
      catchError(() => {
        return of({ role: undefined });
      }),
      map(({ role }) => role),
    );
  }

  logout(): void {
    this.post<LoginResponse>(`${API_URL.AUTH}/logout`, {}).subscribe({
      next: () => {
        this.isLogged$.next(false);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(`Error: ${error}`);
        this.messageService.add({
          severity: 'error',
          summary: 'Cerrar sesión',
          detail: 'Error al cerrar sesión',
        });
      },
    });
  }

  isLogged(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }
}
