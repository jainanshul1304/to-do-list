import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface LoginResponse {
  token: any;
  success: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient)
  private loginUrl = 'http://localhost:5000/users/login';
  private signinUrl = "http://localhost:5000/users/register";
  login(email: string, password: string): Observable<LoginResponse> {
    const loginCredentials = { email, password };
    return this.http.post<LoginResponse>(this.loginUrl, loginCredentials);
  }
  register(email : string, password : string) : Observable<LoginResponse>{
    const signinCredentials = {email, password};
    return this.http.post<LoginResponse>(this.signinUrl, signinCredentials);
  }
}
