import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  provider = undefined;

  constructor( private request : RequestService ) { 
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  formData = new FormData();

  user = {
    "email": "",
    "password": "",
    "photo": null,
    "firstName": "",
    "lastName": "",
    "country": "",
    "dateOfBirth": "",
    "address": {
      "street": "",
      "city": "",
      "state": "",
      "zip": "",
    },
    "phone": "",
    "conditions": "",
    "score": "",
  }


  



  addInFormData ( key , event )
  {
    if ( event.target.value == 'on')
      this.formData.set ( key , "true" );
    else
      this.formData.set ( key , event.target.value );

    console.log ( this.formData.get ( key ))
  }

  

  onFileSelected( event )
  {
    // this.user.photo = new FormData();
    // this.user.photo.append ('photo' , event.target.files[0] , event.target.files[0].name ) 
    this.formData.append ( 'photo' , event.target.files[0] )
  }

  signIn()
  {
    Object.keys( this.user ).forEach((key)=>{ this.formData.append( key,this.user[key] )});
    console.log ( this.formData )
    this.request.signIn( this.formData );
  }

  simpleLogin(){
    this.request.login (this.user.email, this.user.password)
  }

  login (){
    console.log ( this.provider );

    firebase.auth().signInWithPopup(this.provider).then(function(result:any) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log ( user  )

      console.log ( token )
      

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...

      console.log ( errorCode + errorMessage )
    });
  }

  

  ngOnInit() {
  }

}
