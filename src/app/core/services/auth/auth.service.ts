import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Login } from '../../models/auth/login.interface';
import { Observable } from 'rxjs';
import { ResponseObj } from '../../../shared/models/http-response.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly url = environment.beUrl + '/api/auth';
  private token!: string | null;

  constructor() { }

  login(params: Login): Observable<ResponseObj<string>> {
    return this.httpClient.post<ResponseObj<string>>(`${this.url}/login`, params);
  }

  setToken(user: any): void {
    this.token = user.data;
    localStorage.setItem('access_token', this.token!);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('login');
  }
}
