import { Component, OnInit } from '@angular/core';
import { MyCourseService } from '../my-course.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  hide: boolean = false;
  search: boolean = false;
  onSearchName: boolean = false;
  topSearch: any = [];
  image: any = '/assets/Mask Group.png';
  CoursePresent: boolean = true;
  category: any = [];
  keyWord: any = '';
  searchCourseDetails: any;
  filterCourse: boolean = false;
  active: any;

  constructor(
    public service: MyCourseService,
    private dialog: MatDialog,
    public searchService: SearchService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getTopSearch();
    this.getCategory();
  }
  onClick() {
    this.hide = !this.hide;
  }
  getProfile() {
    this.service.getProfileImage().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        console.log(e.error.text);
        this.image = e.error.text;
      },
    });
  }
  onSearch() {
    this.search = !this.search;
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '5%',
    };
    const dialogRef = this.dialog.open(SearchFilterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      if (sessionStorage.getItem('searchCourse')) {
        this.filterCourse = true;
        let details = JSON.parse(sessionStorage.getItem('searchCourse') as any);
        console.log(details);
        this.searchCourseDetails = details;
        if (this.searchCourseDetails.length < 1) {
          this.CoursePresent = false;
          this.onSearchName = false;
        } else {
          this.CoursePresent = true;
          this.onSearchName = true;
        }
      }
    });
  }
  getTopSearch() {
    this.searchService.getTopSearch().subscribe({
      next: (data) => {
        console.log(data);
        this.topSearch = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  searchByCategory(data: any) {
    sessionStorage.removeItem('searchCourse');
    this.filterCourse = false;
    this.keyWord = data;
    const body = {
      text: data,
    };
    this.searchService.searchCategory(body).subscribe({
      next: (data) => {
        console.log(data);

        this.searchCourseDetails = data;
        if (this.searchCourseDetails.length < 1) {
          this.CoursePresent = false;
          this.onSearchName = false;
        } else {
          this.CoursePresent = true;
          this.onSearchName = true;
        }
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
  searchData() {
    sessionStorage.removeItem('searchCourse');
    this.filterCourse = false;
    let data = {
      text: this.keyWord,
    };
    if (this.keyWord != '') {
      this.searchService.searchCourse(data).subscribe({
        next: (data) => {
          console.log(data);
          this.searchCourseDetails = data;
          if (this.searchCourseDetails.length < 1) {
            this.CoursePresent = false;
            this.onSearchName = false;
          } else {
            this.CoursePresent = true;
            this.onSearchName = true;
          }
        },
      });
    }
  }

  goToOverview(details: any) {
    sessionStorage.setItem('courseId', JSON.stringify(details._id));
    sessionStorage.setItem('title', JSON.stringify(details.courseTitle));
    sessionStorage.setItem('image', JSON.stringify(details.courseImage));
    this.router.navigate(['/overview']);
  }
  goToOverviewFilter(details: any) {
    sessionStorage.setItem('courseId', JSON.stringify(details.courseId));
    sessionStorage.setItem('title', JSON.stringify(details.title));
    sessionStorage.setItem('image', JSON.stringify(details.image));
    this.router.navigate(['/overview']);
  }

  closesearch() {
    this.search = false;
    this.keyWord = '';
    this.onSearchName = false;
  }

  logOut() {
    this.router.navigateByUrl('/');
    sessionStorage.clear();
    localStorage.clear();
  }
}
