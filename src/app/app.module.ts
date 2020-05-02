import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';
import { HomeComponent } from './components/home/home.component'

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAYcl80CVK0LaQF1WOqoLRSOP1RDmBFhRs",
  authDomain: "autoecoplant.firebaseapp.com",
  databaseURL: "https://autoecoplant.firebaseio.com",
  projectId: "autoecoplant",
  storageBucket: "autoecoplant.appspot.com",
  messagingSenderId: "146396366366",
  appId: "1:146396366366:web:5d2717f327d3b1820d500f",
  measurementId: "G-MMQR7FT4H6"
};



firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    InfoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
