import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent implements OnInit {
  category: any;
  course: any[] = [];
  duration: any[] = [];
  index: any[] = [];
  active: any;
  details: any;

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.getCategory();
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
  selectCourse(data: any) {
    this.course.push(data);
    this.active = this.course;
    console.log(this.course);
  }
  selectDuration(data: any, i: any) {
    this.duration.push(data);
    this.index.push(i);
    console.log(this.duration);
  }
  clearData() {
    this.course = [];
    this.duration = [];
  }
  filter() {
    const body = {
      categories: this.course,
      totalDuration: this.duration,
    };
    if (this.course.length > 0 && this.duration.length > 0) {
      this.searchService.applyFilter(body).subscribe({
        next: (data) => {
          console.log(data);
          this.details = data;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          sessionStorage.setItem('searchCourse', JSON.stringify(this.details));
          sessionStorage.setItem('dialog', 'true');
        },
      });
    } else {
      alert('please select category and duration');
    }
  }
}
