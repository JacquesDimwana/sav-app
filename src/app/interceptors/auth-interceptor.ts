import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const authService = inject(AuthService);
const token = authService.getToken();
// Clonnage de la requête pour lui ajouter le token JWT :
if (token) {
const cloneReq = req.clone({setHeaders: { Authorization: `Bearer
${token}`}});
return next(cloneReq); // Requête contenant le jeton
}
return next(req); // La requête passe à travers.
};