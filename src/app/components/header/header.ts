import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Navibar } from '../navibar/navibar';

@Component({
  selector: 'app-header',
  imports: [Navibar, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Injection du service d'authentification pour dynamiser le header
  public authService = inject(AuthService);
}