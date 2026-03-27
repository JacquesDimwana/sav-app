import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { SubscribePage } from './pages/subscribe-page/subscribe-page';
import { AccountManagerPage } from './pages/account-manager-page/account-manager-page';
import { RecipeCalculatorPage } from './pages/recipe-calculator-page/recipe-calculator-page';
import { RecipeManagerPage } from './pages/recipe-manager-page/recipe-manager-page';
import { UsersManagerPage } from './pages/users-manager-page/users-manager-page';
import { IngredientsManagerPage } from './pages/ingredients-manager-page/ingredients-manager-page';
import { AboutPage } from './pages/about-page/about-page';
import { LegalNoticePages } from './pages/legal-notice-pages/legal-notice-pages';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // Redirection de la racine vers home
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // Page d'accueil
  { path: 'home', component: HomePage },

  // Pages d'authentification (publiques)
  { path: 'login', component: LoginPage },
  { path: 'subscribe', component: SubscribePage },

  // Compte utilisateur (protégé)
  { path: 'account', component: AccountManagerPage, canActivate: [authGuard] },

  // Recettes
  { path: 'recipe-calculator', component: RecipeCalculatorPage },
  { path: 'recipe-manager', component: RecipeManagerPage, canActivate: [authGuard] },

  // Administration (protégées)
  { path: 'users-manager', component: UsersManagerPage, canActivate: [authGuard] },
  { path: 'ingredients-manager', component: IngredientsManagerPage, canActivate: [authGuard] },

  // Informations
  { path: 'about', component: AboutPage },
  { path: 'legal-notice', component: LegalNoticePages },

  // Redirection par défaut — toujours en dernier
  { path: '**', redirectTo: 'home' },

];