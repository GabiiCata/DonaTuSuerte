import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { RequestService } from './services/request.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  status = 'No conectado'
  clase = 'alert-danger'
  provider = undefined;

  constructor ( private request : RequestService ){
    
    this.testServerConnection()
    this.provider = new firebase.auth.GoogleAuthProvider();

  }

   
  
  login (){
    console.log ( this.provider );
    
    firebase.auth().signInWithPopup(this.provider).then(function(result:any) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...

      console.log ( token )
      console.log ( user )
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

    
  testServerConnection (){

    this.status = 'No conectado'
    this.clase = 'alert-danger'

    this.request.testRequest().then (data => {
      if (data ['message'] == 'json de prueba')
      {
        this.status = 'Conectado al server'
        this.clase = 'alert-success'
      }
    })
  }
   

  sweetRequest(){
    Swal.fire({
      title: 'Request a hackaton-leaf ? ',
      text: "rq a heroku",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hacer request'
    }).then((result) => {
      if (result.value) {
        
       this.request.testRequest()
        .then  ( data => {
          Swal.fire(
            'Resultado: ' + data['message'],
            'ok',
            'success'
          )
        } );;

      }
    })
  }
  title = 'hackaton-app';
}
