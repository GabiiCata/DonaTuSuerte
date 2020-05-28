import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import {   Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  private config;
  private url = "https://dona-tu-suerte-test.herokuapp.com/api/v1";
 
  constructor(private http: HttpClient, private router : Router) 
  {   }

  
  private getHeaders()
  {
    return  new HttpHeaders({
      'Authorization' :  'Bearer ' + localStorage.getItem('token')
    });
  }

  currentUser : any;

  getUser ()
  {
    let uri = '/users/' + localStorage.getItem('id' );

    let httpHeaders = this.getHeaders();

    return this.post ( httpHeaders , null, uri)
    .then(data => { return data } ) 
  }

  

  testRequest(){
    console.log ( "test-connection: loading..." )
    return this.http.get( this.url + "/test" ).toPromise().then( data => {  console.log ( "test-connection: connected" ) ; return data });
  }

  post (header ,  body , uri ){
    return this.http.get ( this.url + uri ,  { headers: header}  ).toPromise()
      .then( data => {
        console.log ( data ) ;
        return data;
      }) 
  }

  signIn( body )
  {
    let uri = "/users/sign-up";


    this.http.post ( this.url + uri , body ).toPromise()
      .then( data => 
        {
          let response:any = data;

          console.log ( response ) ;
          this.currentUser = response;
          Swal.fire({
            icon: 'success',
            title: 'Registro Correcto como: ' + response.data.firstName + " " + response.data.lastName,
            showConfirmButton: false,
            timer: 1500
          })

          this.router.navigate ( ['/signIn']  );

      })
      .catch ( err => {
        console.log ( err )
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 5000
        })
      })



  }

  login (user, pass) {

    let body = {
      "email": user,
      "password": pass
    }

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    console.log ( this.url + '/users/sign-in' + "> " + body)

    this.http.post ( this.url + '/users/sign-in' , body , { headers: httpHeaders} ).toPromise()
      .then ( data => 
        {
          
          let response :any = data;
          console.log ( response.data.user )
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('id',response.data.user._id)
          localStorage.setItem('user', JSON.stringify( response.data.user ))
          
          Swal.fire({
            icon: 'success',
            title: 'Inicio correctamente como: ' + response.data.firstName + " " + response.data.lastName,
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate ( ['/mi-cuenta']  );
        })
      .catch( err => {
        console.log ( err )
        Swal.fire({
          icon: 'error',
          title: 'Fallo en inicio de sesion',
          text: 'Usuario o contraseña incorrecta',
        })
      })
  }

  getSorteos ()
  {
    return this.http.get("./assets/mock/requests.json").toPromise().then ( data => { return data; })
  }

  getRolesDesc ()
  {
    return this.http.get("./assets/properties/roles.json").toPromise().then ( data => { return data; })
  }

  private getConfig(){
    return this.http.get("./assets/properties/config.json").toPromise().then ( data => { return data; })
  }

  private get ( url )
  {
    return this.http.get( url ).toPromise().then ( data => { return data; })
  } 

  getRoles()
  {
    let uri = '/roles';
    console.log ( this.url )
    return this.get ( this.url +  uri ).then( data => { return data} )
  }
  

}
