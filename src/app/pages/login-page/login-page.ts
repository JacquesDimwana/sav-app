import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  public credentials = { identifier: '', password: '' };
  public errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = null;
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/recipe-manager']);
      },
      error: (err) => {
        this.errorMessage = 'Identifiants invalides ou serveur indisponible.';
        console.error('Erreur de connexion', err);
      }
    });
  }
}