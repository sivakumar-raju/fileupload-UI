// auth.service.ts

import { Observable, from } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}


  login(username: string, password: string): Observable<any> {
    console.log('20', username , password)
    return this.http.post<any>('https://whitedeerinnovations.in/login', { username, password });
  }
  

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

 

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return token != null;
    }
    return false;
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    setTimeout(() => this.logout(), 2 * 60 * 1000); // Auto logout after 2 minutes
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
}
