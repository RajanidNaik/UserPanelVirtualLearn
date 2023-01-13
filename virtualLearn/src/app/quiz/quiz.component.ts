import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { SubmitComponent } from '../submit/submit.component';
import { interval, Observable } from 'rxjs';
import { CancelTestComponent } from '../cancel-test/cancel-test.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  select: any = [];
  show: any;
  submit: boolean = false;
  questionList: any;
  quizTime: any;
  questions: any;
  remainTime: any;
  timer: any;
  options: any;
  answers: any[] = [];
  totalQuestion: any;
  index: any;
  qIndex = 0;
  chooseIndex: any;
  click: boolean = false;
  quizDetails: any;
  pause: any;
  counter: any;
  interval: any;
  interval$: any;
  timeOut: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('questionList')) {
      this.questionList = JSON.parse(
        sessionStorage.getItem('questionList') as any
      );
      console.log(this.questionList);
      this.quizTime = this.questionList.totalTimeAlloted;
      this.totalQuestion = this.questionList.totalQuestions;
      this.questions = this.questionList.questions;
      this.options = this.questionList.options;
      this.getQuestions();
      this.startCounter();
    }
    if (sessionStorage.getItem('quizDetails')) {
      this.quizDetails = JSON.parse(
        sessionStorage.getItem('quizDetails') as any
      );
      console.log(this.quizDetails);
    }
  }
  onSelect(i: any) {
    this.select[i] = !this.select[i];
    this.answers[this.qIndex] = i;
    this.index = i;
    console.log(this.answers);
  }
  onSubmit() {
    this.submit = true;
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    (dialogConfig.panelClass = 'trans'),
      this.dialog.open(SubmitComponent, dialogConfig);
  }
  openClose() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.panelClass = 'trans';
    const dialogRef = this.dialog.open(CancelTestComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      clearInterval(this.interval);
      this.interval$.unsubscribe();
    });
  }
  getQuestions() {
    this.answers = new Array(this.totalQuestion).fill(null);
    console.log(this.answers);
    //this.startCountdown();
  }
  next() {
    this.click = false;
    this.show = -1;
    // this.select[this.qIndex] = !this.select[this.qIndex];
    if (this.qIndex + 2 <= this.totalQuestion) {
      this.qIndex++;
      this.questions[this.qIndex] = this.questions[this.qIndex];
    }
  }
  previous() {
    // this.select[this.qIndex] = !this.select[this.qIndex];
    this.click = false;
    this.show = -1;
    if (this.qIndex > 0) {
      this.qIndex--;
      this.questions[this.qIndex] = this.questions[this.qIndex];
    }
  }

  changeTableRowColor(i: any) {
    if (this.chooseIndex != i) {
      this.click = false;
    }
    if (this.show === i) this.show = -1;
    else this.show = i;
    this.chooseIndex = i;
    this.click = !this.click;
    if (this.click == false) {
      this.chooseIndex = null;
    }
  }

  selectedChoice(i: any) {
    this.answers[this.qIndex] = i;
    this.index = i;
    console.log();
    console.log(this.answers);
  }

  startCountdown() {
    this.pause = false;
    this.counter = Number(this.quizTime);
    if (this.pause == false) {
      this.interval = setInterval(() => {
        this.counter--;
        if (this.counter <= 0) {
          this.submitTest();
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
  startCounter() {
    this.counter = Number(this.quizTime);
    this.timeOut = Number(this.quizTime) * 1000;
    console.log(this.timeOut);
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter == 0) {
        this.stopCounter();
        this.submitTest();
        this.interval$.unsubscribe();
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, this.timeOut);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    //alert('Time-up.Please submit the answers');
  }

  submitTest() {
    this.pause = true;
    sessionStorage.setItem('QuizAnswers', JSON.stringify(this.answers));
    this.timer = sessionStorage.setItem('timer', this.counter);

    this.counter = this.counter;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'trans';

    const dialogRef = this.dialog.open(SubmitComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res.data == 'done') {
        this.interval$.unsubscribe();
        alert('hi');
      }
      clearInterval(this.interval);
    });
  }
}
