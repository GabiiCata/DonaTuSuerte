import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  user;

  constructor( private request : RequestService , private router : Router)
  {
       this.user = JSON.parse( localStorage.getItem ( 'user' ) ); 
       console.log ( this.user.lastName );
  }

  ngOnInit() {
  }

  closeSesion(){
    
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Esta por cerrar su sesion actual",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : 'Cancelar', 
      confirmButtonText: 'Cerrar Sesion'
    }).then((result) => {
      if (result.value) {
        localStorage.clear()
        Swal.fire(
          'Sesion finalizada',
          'Que tenga buen día',
          'success'
        )
        this.router.navigate ( ['/signIn']  );
      }
    })
    
  }

}
