import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyCourseService } from '../my-course.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  details: any;
  constructor(public service: MyCourseService, public router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  userLogin() {
    const body = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
    };
    console.log(body);
    this.service.login(body).subscribe({
      next: (data) => {
        console.log(data);
        this.details = data;
        // if (data[0] == '{') {
        //   this.details = JSON.parse(data);
        //   // alert(Object.values(data)[0]);
        //   console.log(this.details.message)
        // }
        alert(this.details.message);
        if (this.details.message == 'Login successful') {
          sessionStorage.setItem('token', this.details.access_token);
        }
      },
      error: (e) => {
        console.log(e);
        alert(e.message);
      },
      complete: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  @HostListener('document:keydown.enter') keydata() {
    this.userLogin();
  }
}
