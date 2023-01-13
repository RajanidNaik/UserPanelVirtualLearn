import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewresult',
  templateUrl: './viewresult.component.html',
  styleUrls: ['./viewresult.component.css'],
})
export class ViewresultComponent implements OnInit {
  quizDetails: any;
  courseTitle: any;

  constructor() {}

  ngOnInit(): void {
    if (sessionStorage.getItem('quizDetails')) {
      this.quizDetails = JSON.parse(
        sessionStorage.getItem('quizDetails') as any
      );
      console.log(this.quizDetails);
    }
    if (sessionStorage.getItem('title')) {
      this.courseTitle = JSON.parse(sessionStorage.getItem('title') as any);
      console.log(this.courseTitle);
    }
  }
}
