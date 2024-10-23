import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
export interface LoginResponse{
    success: any;
}
@Injectable({
    providedIn: 'root'
})

export class Auth{
    apiUrl = 'http://localhost:5000/login';
    constructor(private http: HttpClient) {}
    
    login(email: string, password: string): Observable<LoginResponse> {
      const credentials = {email,password};
      console.log(email,password);
      return this.http.post<LoginResponse>(this.apiUrl,credentials);
    }
}