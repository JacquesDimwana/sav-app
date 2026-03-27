import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navibar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navibar.html',
  styleUrl: './navibar.css',
})
export class Navibar {
  // Injection du service d'authentification pour contrôler l'affichage des liens
  public authService = inject(AuthService);
}