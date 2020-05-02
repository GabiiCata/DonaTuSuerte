import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { RequestService } from './services/request.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor ( private request : RequestService ){
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
        
        request.testRequest()
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
