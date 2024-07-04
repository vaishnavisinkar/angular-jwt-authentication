import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const BASE_URL = ['http://localhost:8080/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "api/auth/sign-up", signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "api/auth/login", loginRequest)
  }
  secretMessage(): Observable<any> {
    return this.http.get(BASE_URL + 'api/secret/message', {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('JWT');
    if (token) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    } else {
      console.log('JWT token not found in the local storage');
      return new HttpHeaders();
    }
  }
}
