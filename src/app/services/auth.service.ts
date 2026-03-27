import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'savapp_jwt_token';

  // Injection du Router pour les redirections (ex: logout → /login)
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  // Envoie les identifiants au backend et stocke le JWT reçu dans le localStorage
  login(credential: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credential).pipe(
      tap((response: any) => {
        if (response.token) {
          // Sauvegarde du token JWT sous la clé "savapp_jwt_token"
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  // Envoie les données d'inscription au backend pour créer un nouvel utilisateur
  register(credential: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, credential);
  }

  // Supprime le token du localStorage et redirige vers la page de connexion
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // Retourne le token JWT brut depuis le localStorage (ou null si absent)
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Vérifie simplement si un token est présent dans le localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Retourne true si l'utilisateur possède un token valide (= est connecté)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Décode le payload Base64 du JWT pour en extraire les données (sub, role, exp...)
  // Retourne null si le token est absent ou malformé
  private getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      // Le JWT est composé de 3 parties séparées par "." : header.payload.signature
      // On extrait la partie centrale (index 1) et on la décode avec atob()
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  // Retourne l'identifiant (claim "sub") de l'utilisateur connecté
  // Affiche "Invité" si aucun token valide n'est présent
  getUserIdentifier(): string {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.sub : 'Invité';
  }

  // Vérifie si l'utilisateur possède un rôle spécifique (ex: 'ROLE_ADMIN')
  // ⚠️ Bug corrigé : le cours avait "decoded.role" sans "!" → condition toujours vraie
  hasRole(role: string): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded || !decoded.role) return false;
    return decoded.role.includes(role);
  }

  // Retourne un objet structuré avec toutes les infos utiles de la session :
  // identifiant, rôles et date d'expiration du token
  getUserFullInfo() {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    return {
      username: decoded.sub,
      roles: decoded.role || [],
      // "exp" est en secondes Unix → conversion en objet Date JavaScript
      expiration: new Date(decoded.exp * 1000)
    };
  }
}