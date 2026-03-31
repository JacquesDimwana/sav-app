import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Utilisateur, UtilisateurService } from '../../services/utilisateur';

@Component({
  selector: 'app-users-manager-page',
  imports: [CommonModule],
  templateUrl: './users-manager-page.html',
  styleUrl: './users-manager-page.css',
})
export class UsersManagerPage implements OnInit {

  private utilisateurService = inject(UtilisateurService);

  public utilisateurs: Utilisateur[] = [];
  public errorMessage: string | null = null;

  ngOnInit(): void {
    // Chargement de la liste au montage du composant
    this.utilisateurService.getAll().subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les utilisateurs.';
        console.error('Erreur chargement utilisateurs', err);
      }
    });
  }
}