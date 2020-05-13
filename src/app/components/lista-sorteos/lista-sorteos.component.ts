import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-lista-sorteos',
  templateUrl: './lista-sorteos.component.html',
  styleUrls: ['./lista-sorteos.component.css']
})
export class ListaSorteosComponent implements OnInit {

  sorteos = undefined;
  
  constructor( private request: RequestService) { 
    request.getSorteos ( )
    .then ( data => 
      {
        this.sorteos = data;
        this.sorteos = this.sorteos.sorteos;
        console.log ( this.sorteos )
      }
    )
  }

  ngOnInit() {
  }

}
