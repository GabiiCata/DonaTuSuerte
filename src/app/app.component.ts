import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor ( private http: HttpClient){
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

        this.http.get( 'https://hackaton-leaf.herokuapp.com/api/v1/test' ).toPromise()
        .then  ( data => {
            Swal.fire(
              'Resultado: ' + data['message'],
              'ok',
              'success'
            )
          } )

        
      }
    })
  }
  title = 'hackaton-app';
}
