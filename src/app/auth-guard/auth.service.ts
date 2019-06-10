import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, shareReplay, tap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { JWTPayload } from './jwtpayload';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  private setSession(authResult) {
    console.log(authResult);
    const token = authResult.token;
    console.log(moment(parseInt(authResult.expiration)));
    const expiresAt = moment(parseInt(authResult.expiration));
    
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', authResult.expiration);
    localStorage.setItem('username', authResult.username);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post(
      environment.loginUrl,
      { 
        "username": username,
        "password": password
      }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    console.log(expiresAt);
    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}