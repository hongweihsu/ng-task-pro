import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:3000';  // 或使用 mock API
  private _token = new BehaviorSubject<string | null>(null);

  token$ = this._token.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.API}/login`, credentials).pipe(
      tap(res => this._token.next(res.token))
    );
  }

  register(data: { email: string; password: string }) {
    return this.http.post(`${this.API}/register`, data);
  }

  logout() {
    this._token.next(null);
  }

  getToken(): string | null {
    return this._token.value;
  }

  isLoggedIn(): boolean {
    return !!this._token.value;
  }
}
