import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  url = 'https://hackaton-leaf.herokuapp.com/api/v1/test';

  testRequest(){
    return this.http.get( this.url ).toPromise().then( data => { return data });
  }

}
