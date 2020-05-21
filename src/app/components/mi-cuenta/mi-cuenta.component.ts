import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  user;

  constructor( private request : RequestService)
  {
       this.user = JSON.parse( localStorage.getItem ( 'user' ) ); 
       console.log ( this.user.lastName );
  }

  ngOnInit() {
  }

}
