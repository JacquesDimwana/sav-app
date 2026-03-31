import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface calquée sur l'entité Kotlin (password ignoré via @JsonIgnore)
export interface Utilisateur {
  id: number;
  username: string;
  email: string;
  estBanned: boolean;
  role: { id: number; nom: string };
  dateCreation: string;
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private readonly API_URL = 'http://localhost:8080/users';

  private http = inject(HttpClient);

  // Récupère la liste complète des utilisateurs inscrits
  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.API_URL);
  }
}