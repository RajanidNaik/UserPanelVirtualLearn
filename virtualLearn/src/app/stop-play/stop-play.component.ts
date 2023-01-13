import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop-play',
  templateUrl: './stop-play.component.html',
  styleUrls: ['./stop-play.component.css']
})
export class StopPlayComponent implements OnInit {
time:any;
  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('realPause')){
      this.time = (JSON.parse(sessionStorage.getItem('realPause') as any));
      
      console.log(this.time)
          }
  }

}
