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

    this.updateComponent()
    
    request.getRolesDesc ( ).then ( roles => {
      
      this.user.role.description = roles[this.user.role._id]
      console.log (this.user.role.description )
    })
       
       console.log ( this.user.lastName );
  }


  updateComponent(){
    this.request.getUser().then(data => {
      let response:any = data;
      this.user = response.data;

    })
  }
  ngOnInit() {
  }

}
