import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { RegisterComponent } from './register/register.component';
// import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent ,canActivate: [authGuard]},
  { path: 'login', component: LoginComponent, pathMatch: 'full'
   },
  //  {path : 'mail', component: HomeComponent},
  {path : "register", component : RegisterComponent},
  { path: '**', component: RouteNotFoundComponent }
];
