import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { SigninComponent } from './components/signin/signin.component';
import { ListaSorteosComponent } from './components/lista-sorteos/lista-sorteos.component';

const routes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'info', component: InfoComponent },
   { path: 'lista-sorteos', component: ListaSorteosComponent },
   { path: 'profile', component: ProfileComponent },
   { path: 'signIn', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
