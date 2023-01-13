import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {
select:boolean=false;
correct:boolean=true;
wrong:boolean =true;
details:any;
index:any;
  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('TestResult')){
      this.details = JSON.parse(sessionStorage.getItem('TestResult') as any);
     console.log( this.details);
    }
    if(sessionStorage.getItem('index')){
      this.index = sessionStorage.getItem('index');
    }
  }
  onSelect(){
    this.select = !this.select;
  }
}
