import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  status = 'primary'

  constructor( private request : RequestService) {
    
   }

  ngOnInit() {
  }

  check()
  {
    console.log ( 'conectando.')
    this.status = 'warning'
    this.request.testRequest().then( data => {
      this.status= 'success';
    }) 
  }


}
