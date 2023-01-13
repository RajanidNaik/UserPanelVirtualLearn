import { Component, OnInit } from '@angular/core';
import { MyCourseService } from '../my-course.service';
import { DashboardService } from '../dashboard.service';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hide: boolean = false;
  name: any = 'Mahendra Singh Dhoni';
  banner: any;
  category: any;
  onGoing: any;
  all: boolean = true;
  popular: boolean = false;
  newest: boolean = false;
  design: any;
  business: any;
  choice: any;
  constructor(
    public service: MyCourseService,
    public dashBoardService: DashboardService,
    public searchService: SearchService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getName();
    this.getBanner();
    this.getCategory();
    this.onGoingCourse();
    this.getTopCourseDesign();
    this.getTopCourseBusiness();
    this.getChoiceCourse('All');
  }
  onClick() {
    this.hide = !this.hide;
  }
  getName() {
    this.service.getName().subscribe({
      next: (data) => {
        console.log(data);
        this.name = data.fullName;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  getBanner() {
    this.dashBoardService.getBanner().subscribe({
      next: (data) => {
        console.log(data);
        this.banner = data;
      },
    });
  }
  getCategory() {
    this.searchService.courseCategory().subscribe({
      next: (data) => {
        console.log(data);
        this.category = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
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
  getChoiceCourse(choice: any) {
    if (choice == 'All') {
      this.all = true;
      this.popular = false;
      this.newest = false;
    } else if (choice == 'Popular') {
      this.all = false;
      this.popular = true;
      this.newest = false;
    } else {
      this.all = false;
      this.popular = false;
      this.newest = true;
    }
    const body = {
      choice: choice,
      view: '',
    };
    console.log(body);
    this.dashBoardService.getChoiceCourse(body).subscribe({
      next: (data) => {
        console.log(data);
        this.choice = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  getTopCourseBusiness() {
    const body = {
      text: 'Business',
      choice: 'seeAll',
    };
    this.dashBoardService.getTopCourse(body).subscribe({
      next: (data) => {
        console.log(data);
        this.business = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getTopCourseDesign() {
    const body = {
      text: 'Design',
      choice: 'seeAll',
    };
    this.dashBoardService.getTopCourse(body).subscribe({
      next: (data) => {
        console.log(data);
        this.design = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
