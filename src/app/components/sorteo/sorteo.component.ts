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

  getRandomArbitrary(min, max) {
    return Math.floor ( Math.random() * (max - min) + min );
  }

  ngOnInit() {
    this.sorteo.score = this.getRandomArbitrary ( 1000, 5000) ; 
  }
  aparticipate(){
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

  participate(){

    let numeroRifas = "";
    Swal.mixin({
     
      confirmButtonText: 'Continuar &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Nuevo sorteo por: ',
        text: this.sorteo.premio
      },
      {
        title: '¿Cuantas rifas querés canjear?',
        input: 'select',
        inputOptions: {
          1: '1 : 120 puntos',
          2: '2 : 240 puntos',
          3: '3 : 360 puntos',
          4: '4 : 480 puntos',
          5: '5 : 600 puntos',
          6: '6 : 720 puntos',
          7: '7 : 840 puntos',
          8: '8 : 960 puntos',
          9: '9 : 1080 puntos',
          10: '10 : 1200 puntos'
        },
        inputPlaceholder: 'Cantidad de rifas',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if ( value != "" ){
              numeroRifas = value
            }else{
              resolve('Sos pelotudo o te haces ? ')
            }
           
            resolve()
          })
        }
      },
      {
        title : 'Presiona continuar para finalizar !',
      }
    ]).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Perfecto ! ',
          text: 'Estas participando con ' + numeroRifas + ' rifas para ' + this.sorteo.premio,
          imageUrl: this.sorteo.photo,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          timer: 3000,
          timerProgressBar:true,
          showConfirmButton: false
        })

      }
  }
    )}
  
}
