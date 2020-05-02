import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { RequestService } from './services/request.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  status = 'No conectado'
  clase = 'alert-danger'

  constructor ( private request : RequestService ){
    
    request.testRequest().then (data => {
      if (data ['message'] == 'json de prueba')
      {
        this.status = 'Conectado'
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
