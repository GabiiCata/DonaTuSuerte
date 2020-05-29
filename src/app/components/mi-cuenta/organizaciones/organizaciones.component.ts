import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

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

  constructor( private request : RequestService) { 
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
      window.location.reload();

    })
    this.showNewStoreForm = false;
  }


  showDraws = false;

  loadDraws () 
  {
    console.warn ( 'TODO: loadDraws')
  }

}
