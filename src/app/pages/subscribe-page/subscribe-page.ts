import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscribe-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './subscribe-page.html',
  styleUrl: './subscribe-page.css',
})
export class SubscribePage {

  public credentials = {
    identifier: '',
    password: '',
    confirmPassword: ''
  };

  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.authService.register({
      identifier: this.credentials.identifier,
      password: this.credentials.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Inscription impossible. Cet identifiant est peut-être déjà utilisé.';
        console.error('Erreur inscription', err);
      }
    });
  }
}