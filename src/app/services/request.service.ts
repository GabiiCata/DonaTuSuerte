import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import {   Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  private config;
  private url;
 
  constructor(private http: HttpClient, private router : Router) 
  {
     this.getConfig().then ( data => { return   this.configEnviroment ( data ["prod"] )    }); 
  }

  private configEnviroment ( data )
  {
    this.url = data.url;
    console.log ( this.url );
  }
  
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
    let uri = "/users/register";


    this.http.post ( this.url + uri , body ).toPromise()
      .then( data => 
        {
          console.log ( data ) ;
          this.currentUser = data;
          this.login (this.currentUser.email , this.currentUser.password)

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

    console.log ( this.url + '/users/signin' + "> " + body)

    this.http.post ( this.url + '/users/signin' , body , { headers: httpHeaders} ).toPromise()
      .then ( data => 
        {
          
          let response :any = data;
          console.log ( response.data.user )
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('id',response.data.user._id)
          localStorage.setItem('user', JSON.stringify( response.data.user ))
          
          Swal.fire({
            icon: 'success',
            title: 'Inicio correctamente como: ' + response.data.user.firstName + " " + response.data.user.lastName,
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

  private getConfig(){
    return this.http.get("./assets/properties/config.json").toPromise().then ( data => { return data; })
  }
  

}
