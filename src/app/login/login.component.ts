// login.component.ts

import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private snackBar: MatSnackBar ,private authService: AuthService, private router: Router, private titleService: Title ) {
    this.titleService.setTitle('White Deer Innovation - Product Sourcing Services | Parisspany-Trony');
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/background-verification']);
      },
      error: (error) => {
        this.snackBar.open('Invalid username or password', 'Close', {
          duration: 1000,
          panelClass: ['snackbar-success']
        });
        console.error('Login failed', error)}
    });
  }
}
