import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
      this.status= 'success'

      Swal.fire('Conected',data.message)
    }) 
  }

}
