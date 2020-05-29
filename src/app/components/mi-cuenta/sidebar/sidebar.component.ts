import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user:any

  constructor( private request : RequestService , private router : Router ) {
    this.user = JSON.parse( localStorage.getItem ( 'user' ) ); 
    request.getRolesDesc ( ).then ( roles => {
      
      this.user.role.description = roles[this.user.role._id]
      console.log (this.user.role.description )
    })
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
