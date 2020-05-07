import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  url = 'https://hackaton-leaf.herokuapp.com/api/v1';

  testRequest(){
    return this.http.get( this.url ).toPromise().then( data => { return data });
  }


  signIn( body )
  {
    let uri = "/users/register";

    // let httpHeaders = new HttpHeaders({
    //   'Authorization' : 'Bearer ' + localStorage.getItem('token')
    // });

    this.http.post ( this.url + uri , body ).toPromise()
      .then( data => {
        console.log ( data ) ;
      }) 

  }

  getSorteos ()
  {
    return this.http.get("./assets/mock/requests.json").toPromise().then ( data => { return data; })
  }

}
