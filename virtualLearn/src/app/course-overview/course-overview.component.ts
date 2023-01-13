import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinalComponent } from '../final/final.component';
import { MyCourseService } from '../my-course.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { StopPlayComponent } from '../stop-play/stop-play.component';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
more:boolean=false;
mores:boolean=false;
overview:boolean=true;
chapter:boolean=false;
shows:any=[];
complete:boolean=false;
courseId:any;
courseDetails:any;
video :any;
title:any = " Learn Figma-UI/Ux Design Essential training";
chapters:any;
watchChapterNumber: any;
chapterCompleted: any;
approvalRate:any;
questionList:any;
videoClick:boolean=false;
onGo=true;
  curtime: any;
  lessonDuration:any;
  lessonNumber:any;
  pauseTime:any;
  videoStatus: any;
  statusOfVideo:any;
  quizDetails:any;
currentVideo:any;
totalChpater:any;
totalLesson:any;
category:any;
courseOverviewLine:any;
preview:any;
currentChapter:any;
preViewVideo:any;

  constructor(public service:MyCourseService,public router:Router, public dialog:MatDialog) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('courseId')){
      this.courseId = JSON.parse(sessionStorage.getItem('courseId') as any);
      this.courseOverview();
      this.chapterList();
      
    }
    if(sessionStorage.getItem('title')){
this.title = JSON.parse(sessionStorage.getItem('title') as any);
console.log(this.title)
    }
    
   if(sessionStorage.getItem('active-tab')){
    let tab = sessionStorage.getItem('active-tab');
    if(tab == 'overview'){
      this.overview = true;
      this.chapter = false;
    } else {
      this.chapter = true;
      this.overview = false;
    }
   }
   if(this.courseDetails.isEnrolled !=null){
    if(this.courseDetails.courseOverview.courseContent.totalChapters === this.courseDetails.isEnrolled.chaptersCompleted ){
      this.onGo=false;
   }
   
  }
    
  
   
  }
  close(){
    this.videoClick =false;
  }
  onGoClick(){
    this.onGo = false;
  }
  onClickVideo(lesson:any,chap:any){
    this.openWatchDialog(lesson);
    console.log(chap)
    //if(this.currentChapter == chap.chapterNumber){
      this.onGo=false;
    this.videoClick =true;
    this.video=lesson.url;
    this.videoStatus="false";
    sessionStorage.setItem('videoStatus',this.videoStatus)
    sessionStorage.setItem('lessonNumber',JSON.stringify(lesson.serialNumberOfLesson));
    sessionStorage.setItem('lessonId',JSON.stringify(lesson._id));
    sessionStorage.setItem('lessonDuration',JSON.stringify(lesson.duration));
    // }else{
    //   alert('please complete the previous chapter')
    // }
  
  }
showMore(){
  this.more =!this.more;
}
showMores(){
  this.mores =!this.mores;
}
onOverview(){
  this.overview = true;
  this.chapter =false;
  sessionStorage.setItem('active-tab','overview');
}
onChapter(){
  this.overview = false;
  this.chapter =true;
  
  sessionStorage.setItem('active-tab','chapters');
  // this.final();
  if(this.chapters.isEnrolled == null){
    alert('Please join the course')
  }
}
show(i:any){
  this.shows[i] = !this.shows[i];
  
}
courseOverview(){
  const body ={
    "courseId":this.courseId
  }
  this.service.getOverview(body).subscribe({
    next:(data)=>{
     
      this.courseDetails = data;
      console.log(this.courseDetails)
     
    
    },
    error:(e)=>{
      console.log(e)
    },
    complete:()=>{
      this.video =this.courseDetails.courseOverview.overViewId.previewThisCourse.videoLink;
      this.preViewVideo=this.courseDetails.courseOverview.overViewId.previewThisCourse.videoLink
      this.totalChpater = this.courseDetails.courseOverview.courseContent.totalChapters;
      this.totalLesson = this.courseDetails.courseOverview.courseContent.totalLessons;
      this.category = this.courseDetails.courseOverview.category;
      this.courseOverviewLine = this.courseDetails.courseOverview.overViewId.description;
      this.preview = this.courseDetails.courseOverview.overViewId.previewThisCourse.description;
      this.final();

      
    }
  })
}
chapterList(){
  const body = {
    "view":"chapters",
    "courseId":this.courseId
  }
  this.service.getChapter(body).subscribe({
    next:(data)=>{
      console.log(data);
      this.chapters = data;
      if(this.chapters.isEnrolled != null){
        this.currentChapter = this.chapters.isEnrolled.ongoingVideo.chapterNo;
        this.watchChapterNumber = this.chapters.isEnrolled.ongoingSerialNumber;
        console.log(this.watchChapterNumber);
          this.chapterCompleted =this.chapters.isEnrolled.chaptersCompleted;
          console.log(this.chapters);
          
          this.approvalRate = this.chapters.isEnrolled.testApprovalRate;
          console.log(this.approvalRate);
          let index = 0;
          for(let data of this.chapters.listOfChapters.totalChapters[0].chapters){
            console.log(data);
            if(data.test != null){
              let indexofData = this.chapters.listOfChapters.totalChapters[0].chapters.indexOf(data);
              data['approvalRate']=this.approvalRate[index];
              index = index + 1;
              this.chapters.listOfChapters.totalChapters[0].chapters[indexofData] = data;
              console.log(this.chapters.listOfChapters.totalChapters[0].chapters);
              
            }
            
          }
  
          let ongoingchapter = this.chapters.isEnrolled.ongoingVideo.chapterNo;
  let ongoingSerialNumber = this.chapters.isEnrolled.ongoingVideo.lessonNo;
  console.log(ongoingSerialNumber);
  
  
  if(ongoingchapter>=1 && ongoingSerialNumber>=1){
    this.video = this.chapters.listOfChapters.totalChapters[0].chapters[ongoingchapter-1].lessons[ongoingSerialNumber-1].url;
    console.log(this.video);
    sessionStorage.setItem('lessonNumber',JSON.stringify(this.chapters.listOfChapters.totalChapters[0].chapters[ongoingchapter-1].lessons[ongoingSerialNumber-1].serialNumberOfLesson));
    sessionStorage.setItem('lessonDuration',JSON.stringify(this.chapters.listOfChapters.totalChapters[0].chapters[ongoingchapter-1].lessons[ongoingSerialNumber-1].duration));
    this.videoStatus="false";
      sessionStorage.setItem('videoStatus',this.videoStatus)
  }

      }
      // else{
      //   alert('Please Join the course');
      //   // this.onOverview();
      // }
     
    }
  })
}
getQuestionList(courseId:any,testId:any,chapter:any){
  let lessonNumber = chapter.numberOfLessons;
  let ongoinglesson = this.chapters.isEnrolled.ongoingVideo.lessonNo;
  let onGoChapter = chapter.chapterNumber;
  console.log(lessonNumber ,ongoinglesson.onChapter)
  if(this.currentChapter == onGoChapter){
    if( ongoinglesson >= lessonNumber){
      const body={
        "courseId":courseId,
        "testId":testId
      };
      console.log(body);
      console.log(chapter);
      this.quizDetails = chapter;
      this.service.getQuestion(body).subscribe({
        next:(data)=>{
          console.log(data);
          this.questionList = data;
        },
        error:(e)=>{
          console.log(e)
        },
        complete:()=>{
    sessionStorage.setItem('questionList',JSON.stringify(this.questionList));
    sessionStorage.setItem('quizDetails',JSON.stringify(this.quizDetails));
    if(chapter.approvalRate <= 0 ){
      this.router.navigate(['/quiz']);
    }else{
      alert('You have already passed this test');
      this.router.navigate(['/result']);
    }
    
    
    
        }
      })
    }else{
      alert('please complete the lessons');
    }
  }else{
    alert('please complete the previous chapter')
  }
  

}

getVideoPauseTime(){
  
  var video = document.getElementById("singleVideo") as any;
  console.log(video.paused);
  this.curtime = video.currentTime;
      sessionStorage.setItem('pauseTime',JSON.stringify(this.curtime));
      this.upadteUserProgress();
}



upadteUserProgress(){
  this.lessonDuration = JSON.parse(sessionStorage.getItem('lessonDuration') as any) ;
  this.lessonNumber = JSON.parse(sessionStorage.getItem('lessonNumber') as any) ;
  this.pauseTime = (sessionStorage.getItem('pauseTime'));
  this.statusOfVideo = (sessionStorage.getItem('videoStatus') )
   
  const body={
    "courseId":this.courseId,
    "videoCompleted":this.statusOfVideo,
    "pauseTime":this.pauseTime,
    "videoSerialNumber":this.lessonNumber
  }
  console.log(body);
  this.service.updateUserProgress(body).subscribe({
    
    next:(data)=>{
      console.log(data);
      let message = data;
      console.log(message.message);
     
      if(message.message==="Lesson completed"){
        alert(message.message);
        // this.onGo=true;
        const body={
          "courseId":this.courseId,
        }
        this.service.getProgress(body).subscribe({
          next:(data)=>{
            console.log(data);
          },
          error:(e)=>{
            console.log(e)
          }
        })
      }
    },error:(e)=>{
      console.log(e.error.message)
      alert(e.error.message)
    },
    complete:()=>{
      this.chapterList();
    }
  })
}
completeVideo(){
  this.videoStatus ="true";
  sessionStorage.setItem('videoStatus',this.videoStatus);
  this.upadteUserProgress();
  const body={
    "courseId":this.courseId,
  }
  this.service.getProgress(body).subscribe({
    next:(data)=>{
      console.log(data);
    },
    error:(e)=>{
      console.log(e)
    },
    complete:()=>{
      this.onGo = true;
    }
  })
}

final(){
  
  if(sessionStorage.getItem('finalApp') == undefined){
    // alert("hello")
    if(this.courseDetails.isEnrolled != null){
      if(this.courseDetails.courseOverview.courseContent.totalChapters === this.courseDetails.isEnrolled.chaptersCompleted ){
        this.onGo=false;
        
        this.complete = true;
        
        sessionStorage.setItem('finalApp',this.courseDetails.isEnrolled.approvalRate );
  
        if(sessionStorage.getItem('count') == undefined){
          // alert('hi');
          sessionStorage.setItem('count','true');
          this.router.navigate(['/final']);
        }
        
      }
    }
    
    
    
     
  
  
  } 
}

openWatchDialog(lesson:any){
  let status = this.chapters.isEnrolled.allVideoStatus;
  let serialNumber = lesson.serialNumberOfLesson;
  console.log(status);
  if(status.length>0){
    for (let lesson of status){
      if(lesson.serialNumber == serialNumber){
        let time = lesson.pauseTime;
        sessionStorage.setItem('realPause',time)
        console.log(time);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width='30%';
        // dialogConfig.position ={
        //   left:'15%',
        //   top:'12%'
         
        // }
        dialogConfig.panelClass = 'trans',
        this.dialog.open(StopPlayComponent,dialogConfig)  ;
      }
    }

  }
 
}

enrollCourse(){
  const body = {
    "courseId":this.courseId
  }
  this.service.enrollCourse(body).subscribe({
    next:(data)=>{
      console.log(data);
      alert(data.message);
    },
    error:(e)=>{
      console.log(e);
      alert(e.error.message)
    }
  })
}


}
