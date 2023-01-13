import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { SearchService } from '../search.service';
@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css']
})
export class SeeAllComponent implements OnInit {
  category: any;
  banner: any;

  constructor(public dashBoardService: DashboardService,
    public searchService: SearchService) { }

  ngOnInit(): void {
    this. getCategory();
    this.getBanner();
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
  getBanner() {
    this.dashBoardService.getBanner().subscribe({
      next: (data) => {
        console.log(data);
        this.banner = data;
      },
    });
  }
}
