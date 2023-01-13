import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyCourseService } from '../my-course.service';
@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css'],
})
export class SubmitComponent implements OnInit {
  timer: any;
  details: any;
  answers: any;
  courseId: any;
  courseImage: any;
  courseTitle: any;
  result: any;
  hide: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<SubmitComponent>,
    public service: MyCourseService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('timer')) {
      this.timer = JSON.parse(sessionStorage.getItem('timer') as any);
      console.log(this.timer);
      if (this.timer == 0) {
        this.hide = false;
      }
    }
    if (sessionStorage.getItem('quizDetails')) {
      this.details = JSON.parse(sessionStorage.getItem('quizDetails') as any);
      console.log(this.details);
    }
    if (sessionStorage.getItem('QuizAnswers')) {
      this.answers = JSON.parse(sessionStorage.getItem('QuizAnswers') as any);
      console.log(this.answers);
    }
    if (sessionStorage.getItem('courseId')) {
      this.courseId = JSON.parse(sessionStorage.getItem('courseId') as any);
      console.log(this.courseId);
    }
    if (sessionStorage.getItem('image')) {
      this.courseImage = JSON.parse(sessionStorage.getItem('image') as any);
      console.log(this.courseImage);
    }
    if (sessionStorage.getItem('title')) {
      this.courseTitle = JSON.parse(sessionStorage.getItem('title') as any);
      console.log(this.courseTitle);
    }
  }
  submitTest() {
    const body = {
      courseId: this.courseId,
      courseTitle: this.courseTitle,
      courseImageUrl: this.courseImage,
      chapterNumber: this.details.chapterNumber,
      chapterTitle: this.details.chapterTitle,
      chapterId: this.details._id,
      testId: this.details.test._id,
      answers: this.answers,
    };
    console.log(body);
    this.service.submitTest(body).subscribe({
      next: (data) => {
        console.log(data);
        this.result = data;
        alert(this.result.message);
        if (this.result.message == 'You have failed the Test') {
          this.router.navigate(['/overview']);
        } else {
          this.router.navigate(['/view']);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.dialogRef.close({ data: 'done' });
  }
}
