import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  private config;
  private url;

  constructor(private http: HttpClient) 
  {
     this.getConfig().then ( data => { return   this.configEnviroment ( data ["prod"] )    }); 
  }

  private configEnviroment ( data )
  {
    this.url = this.config.url;
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
    return this.http.get( this.url + "/test" ).toPromise().then( data => { return data });
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

    this.http.post ( this.url + '/users/login' , body , { headers: httpHeaders} ).toPromise()
      .then ( data => 
        {
          let response :any = data;
          localStorage.setItem('token',response.token)
          localStorage.setItem('id',response.user._id)
          Swal.fire({
            icon: 'success',
            title: 'Inicio correctamente como: ' + response.user.firstName + " " + response.user.lastName,
            showConfirmButton: false,
            timer: 1500
          })
        })
      .catch( err => {
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
