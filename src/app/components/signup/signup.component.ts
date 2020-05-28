import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import * as firebase from 'firebase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  provider = undefined;
  showRoles = false;
  showSignUpForm = false;
  roles = [];

  constructor( private request : RequestService ) { 
    this.provider = new firebase.auth.GoogleAuthProvider();

    request.getRoles().then ( data => {
       let response : any = data;
      this.roles = response.data;
      request.getRolesDesc ( ).then ( data => 
        {
        this.roles.forEach ( role => {
          role.description = data[role._id]
        })
      })
      this.showRoles = true;
    })
  }

  formData = new FormData();

  user = {
    "email": "",
    "password": "",
    "photo": "",
    "firstName": "",
    "lastName": "",
    "dateOfBirth": "",
    "country": "",
    "address": {
      "street": "",
      "city": "",
      "state": "",
      "postalCode": "",
      "country": "",
      "lat": "",
      "lon": ""
    },
    "phone": "",
    "conditions": false,
    "score": 0,
    "role": ""
  }

  

  selectRole( roleSelected )
  {
    this.user.role = roleSelected;
    this.showSignUpForm = true;
    this.showRoles = false;
  }
  



  addInFormData ( key , event )
  {
    // console.log ( key + " " + event)
    // if ( event.target.value == 'on')
    //   this.formData.set ( key , "true" );
    // else
    //   this.formData.set ( key , event.target.value );

    // console.log ( this.formData.get ( key ))
  }

  

  onFileSelected( event )
  {
    // this.user.photo = new FormData();
    // this.user.photo.append ('photo' , event.target.files[0] , event.target.files[0].name ) 
    this.formData.append ( 'photo' , event.target.files[0] )
  }

  signUp()
  {
    Object.keys( this.user ).forEach((key)=>{ this.formData.append( key,this.user[key] )});
    Object.keys( this.user ).forEach((key)=>{ console.log ( key + ": " + this.formData.get( key ) ) });
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


  changeUser(){
    this.showRoles = true;
    this.showSignUpForm = false;
  }
  

  ngOnInit() {
  }

}
