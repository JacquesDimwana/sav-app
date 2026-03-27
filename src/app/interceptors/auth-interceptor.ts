import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Clonage de la requête pour lui ajouter le token JWT si présent
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // On transmet la requête (avec ou sans token) et on surveille les erreurs HTTP
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si le serveur répond 401 (Unauthorized), le token est expiré ou invalide
      // On déclenche le logout qui nettoie le localStorage et redirige vers /login
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
