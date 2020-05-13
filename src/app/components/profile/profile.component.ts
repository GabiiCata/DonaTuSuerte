import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user :any;

  constructor( private request : RequestService )
  {
    request.getUser().then ( data => { this.user = data })
  }

  ngOnInit() {
  }

  puser = 
  {
    "_id": "5ebb8386cfe6f900171930f6",
    "email": "pipigato@gmail.com",
    "password": "$2b$10$w57tvPa8gQDtK.wVd70vLeNZl6jVSbAl33rOpBHfnSoFEB2ctJb/G",
    "photo": "https://hackaton-leaf.herokuapp.com:45384/uploads/",
    "firstName": "PIPI",
    "lastName": "GATO",
    "country": "Argentina",
    "dateOfBirth": "1994-02-12T00:00:00.000Z",
    "phone": "47779952",
    "conditions": true,
    "score": 80000
}

}
