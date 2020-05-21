import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { SigninComponent } from './components/signin/signin.component';
import { ListaSorteosComponent } from './components/lista-sorteos/lista-sorteos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'info', component: InfoComponent },
   { path: 'lista-sorteos', component: ListaSorteosComponent },
   { path: 'profile', component: ProfileComponent },
   { path: 'signIn', component: SigninComponent },
   { path: 'contacto', component: ContactoComponent },
   { path: 'mi-cuenta', component: MiCuentaComponent , canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
