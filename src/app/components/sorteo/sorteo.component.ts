import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.component.html',
  styleUrls: ['./sorteo.component.css']
})
export class SorteoComponent implements OnInit {

  constructor( private request: RequestService) { 
  
  }

  @Input() sorteo : any = false;


  ngOnInit() {
  }
  participate(){
    Swal.fire({
      title: 'Estas por entrar a un sorteo nuevo',
      text: "Se reflejará en tus sorteos activos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Participar !'
    }).then((result) => {
      if (result.value) {
      this.request.testRequest().then(data => {
        let variable:any = data;
        console.log ( variable.message )
        Swal.fire(
          'Paticipando',
          'Request : '  + variable.message ,
          'success'
        )
      })
      
        
      }
    })
  }


  
}
