import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { MyCourseService } from '../my-course.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  details: any;
  quizDetails: any;
  correct: any;
  wrong: any;
  grade: any;
  approval: any;
  courseTitle: any;
  marks: any;
  constructor(private dialog: MatDialog, public service: MyCourseService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('quizDetails')) {
      this.quizDetails = JSON.parse(
        sessionStorage.getItem('quizDetails') as any
      );
      console.log(this.quizDetails);
      this.getResult();
    }
    if (sessionStorage.getItem('title')) {
      this.courseTitle = JSON.parse(sessionStorage.getItem('title') as any);
      console.log(this.courseTitle);
    }
  }
  openDialog() {
    sessionStorage.removeItem('index');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100%';
    dialogConfig.width = '40%';
    dialogConfig.position = {
      right: '0%',
    };

    this.dialog.open(ResultDialogComponent, dialogConfig);
  }
  openParticular(i: any) {
    sessionStorage.setItem('index', i);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100%';
    dialogConfig.width = '40%';
    dialogConfig.position = {
      right: '0%',
    };

    this.dialog.open(ResultDialogComponent, dialogConfig);
  }
  getResult() {
    const body = {
      testId: this.quizDetails.test._id,
    };
    console.log(body);
    this.service.getResult(body).subscribe({
      next: (data) => {
        console.log(data);
        this.details = data;
        console.log(this.details);
        this.correct = this.details.correctlyAnswered;
        this.wrong = this.details.wronglyAnswered;
        this.grade = this.details.passingGrade;
        this.approval = this.quizDetails.approvalRate;
        if (this.correct == '5/5') {
          this.marks = 100;
        } else if (this.correct == '4/5') {
          this.marks = 80;
        } else if (this.correct == '3/5') {
          this.marks = 60;
        } else {
          this.marks = 0;
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        sessionStorage.setItem('TestResult', JSON.stringify(this.details));
      },
    });
  }
}
