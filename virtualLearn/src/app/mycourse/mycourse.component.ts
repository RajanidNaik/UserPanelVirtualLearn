import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CertificateComponent } from '../certificate/certificate.component';
import { MyCourseService } from '../my-course.service';
@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.css'],
})
export class MycourseComponent implements OnInit {
  hide: boolean = false;
  onGo: boolean = true;
  complete: boolean = false;
  onGoing: any;
  completeCourseDetail: any;

  constructor(
    private dialog: MatDialog,
    public service: MyCourseService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.onGoingCourse();
    this.completeCourse();
    sessionStorage.removeItem('count');
    sessionStorage.removeItem('finalApp');
    if (this.onGoing.length == 0 && this.completeCourseDetail.length == 0) {
      this.hide = true;
    }
  }
  onGoCourse() {
    this.onGo = true;
    this.complete = false;
  }
  onComplete() {
    this.onGo = false;
    this.complete = true;
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100%';
    dialogConfig.width = '100%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';
    (dialogConfig.panelClass = 'full-screen-modal'),
      this.dialog.open(CertificateComponent, dialogConfig);
  }
  onGoingCourse() {
    this.service.getOngoingCourse().subscribe({
      next: (data) => {
        console.log(data);
        this.onGoing = data;
      },
    });
  }
  getCourseId(id: any, title: any, Imageurl: any) {
    sessionStorage.setItem('courseId', JSON.stringify(id));
    sessionStorage.setItem('title', JSON.stringify(title));
    sessionStorage.setItem('image', JSON.stringify(Imageurl));
    this.router.navigate(['/overview']);
  }
  //complete
  completeCourse() {
    this.service.getCompletedCourse().subscribe({
      next: (data) => {
        console.log(data);
        this.completeCourseDetail = data;
      },
    });
  }
  getCertificate(id: any) {
    sessionStorage.setItem('certificate', JSON.stringify(id));
  }
}
