import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  more:boolean=false;
  overview:boolean=false;
  chapter:boolean=true;
  shows:any;
  complete:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
  showMore(){
    this.more =!this.more;
  }
  onOverview(){
    this.overview = true;
    this.chapter =false;
  }
  onChapter(){
    this.overview = false;
    this.chapter =true;
  }
  show(){
    // this.shows[i] = !this.shows[i];
    this.shows = !this.shows;
  }
}
