import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.css']
})
export class OrganizacionesComponent implements OnInit {

  user : any
  organizationSelected: any;
  showStores = false;
  showOrganizations = true;

  constructor( private request : RequestService , private router : Router) { 
    this.user = JSON.parse( localStorage.getItem ( 'user' ) ); 
  }


  ngOnInit() {
  }

  loadStores( id )
  {
    console.warn ('get organization ' + id)

    this.request.getOrganization( id ).then ( data => {
      this.organizationSelected = data;
      this.showOrganizations = false;
      this.showStores = true;
      console.log ( data )
    })

    // this.user.organizations.forEach( org => {
    //   if  ( org._id == id ){
        
        
    //     console.log ( org.stores.length)
    //   }
    // });
  }

  goBackOrganizations(){
    this.showStores = false;
    this.showOrganizations = true;
  }

  showNewStoreForm = false;
  newStore(){
    this.showNewStoreForm = true;
  }

  store = 
  {
    "name": "",
    "address": {
      "street": "",
      "city": "",
      "state": "",
      "postalCode": "",
      "country": "",
      "lat": "-34.61020399",
      "lon": "-58.42448026"
    }
  }


  createNewStore ()
  {
    console.log ( this.organizationSelected._id)
    this.request.addStore ( this.store , this.organizationSelected._id )
    .then ( data => {
      Swal.fire('Sucursal creada', 'Ahora puedes crear sorteos para dicha sucursal' , 'success')
      

    })
    this.showNewStoreForm = false;
  }


  showDraws = false;

  storeSelected : any; 

  loadDraws ( id ) 
  {
      this.organizationSelected.stores.forEach( store  => {
        if ( store._id == id )
        {
          this.storeSelected = store;
        }
      });

      this.showDraws = true;
      this.showStores = false;
  }


  updateOrganization(){
    this.request.updateOrganization( this.organizationSelected )
    .then ( data => {
       
      Swal.fire({
        icon: 'success',
        title: 'Organización Actualiazada con éxito',
        showConfirmButton: false,
        timer: 3000
      })
    });
  }

  deleteOrganization()
  {
    Swal.fire({
      title: '¿Seguro que quiere proceder?',
      text: "Se eliminará las sucursales y todos los sorteos incluidos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.request.deleteOrganization ( this.organizationSelected._id )
        .then ( data => {
          Swal.fire(
            'Organizacion eliminada con éxito',
            'Se reflejará en tu lista de organizaciones',
            'success'
          )
        })
        
      }
    })
  }

  updateStore()
  {
    this.request.updateStore( this.storeSelected )
    .then ( data => {
       
      Swal.fire({
        icon: 'success',
        title: 'Sucursal Actualiazada con éxito',
        showConfirmButton: false,
        timer: 3000
      })
    });
  }

  deleteStore ()
  {
    Swal.fire({
      title: '¿Seguro que quiere proceder?',
      text: "Se eliminarán todos los sorteos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.request.deleteStore ( this.storeSelected._id , this.organizationSelected._id )
        .then ( data => {
          Swal.fire(
            'Sucursal eliminada con éxito',
            'Se reflejará en tu lista de sucursales',
            'success'
          )
        })
        
      }
    })
  }

}
