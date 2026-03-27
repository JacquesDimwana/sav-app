import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-manager-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './account-manager-page.html',
  styleUrl: './account-manager-page.css',
})
export class AccountManagerPage {
  public authService = inject(AuthService);
  // Récupération de l'objet complet des infos de session depuis le JWT
   public userInfo = this.authService.getUserFullInfo();

}
