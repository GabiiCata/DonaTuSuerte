import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  status = 'primary'

  constructor( private request : RequestService , private vps: ViewportScroller) {
    
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


  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


}
