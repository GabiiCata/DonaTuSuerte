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

  scrollTo(section)
  {
    document.getElementById(section).scrollIntoView ( {behavior:"smooth"} );
  }

  check()
  {
    console.log ( 'conectando.')
    this.status = 'warning'
    this.request.testRequest().then( data => {
      this.status= 'success'

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Connected !'
      })
    }) 
  }
  scrollTo(section)
  {
    document.getElementById(section).scrollIntoView ( {behavior:"smooth"} );
  }
}
