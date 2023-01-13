import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MyCourseService } from '../my-course.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
courseId:any;
image:any="/assets/certificate-of-completion-_Virtuallearn2 1.png";
pdf:any;
url="http://res.cloudinary.com/dghcx4s2l/image/upload/v1672392564/pdf/imolnl26c634d4pfaykf.pdf";
trustedUrl:any;
  constructor(public router:Router,public service:MyCourseService, private sanitizer: DomSanitizer) {
    this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.url);
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
   }
 
  ngOnInit(): void {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.url);
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    if(sessionStorage.getItem('courseId')){
      this.courseId = JSON.parse(sessionStorage.getItem('courseId') as any);
    }
    this.getCertificate();
  }

  
  onClick(){
    sessionStorage.removeItem('finalApp');
    this.router.navigate(['/overview']);
  }
// git@github.com:RajanidNaik/NewVirtualLearnApp.git
getCertificate(){
  const body ={
     "courseId":this.courseId
    // "courseId":"638d6c7fa572c21b9fe07fbd"
  }
  this.service.getCertificate(body).subscribe({
    next:(data)=>{
      console.log(data);
      //console.log(data.message);
      if(data.message != "certificate not found"){
        this.pdf=data[0];
        console.log(this.pdf);
        this.url = data[0].certificate;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.url);
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
      }
    },
    error:(e)=>{
      console.log(e)
    }
  })
}
}
