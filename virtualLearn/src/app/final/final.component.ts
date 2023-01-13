import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { CertificateComponent } from '../certificate/certificate.component';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {
  courseTitle: any;
  final: any=90;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('title')){
      this.courseTitle = JSON.parse(sessionStorage.getItem('title') as any);
     console.log( this.courseTitle);
    }
    if(sessionStorage.getItem('finalApp')){
      this.final = (sessionStorage.getItem('finalApp'));
     console.log( this.final);
    }
  }
  //finalApp
  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '100%';
    dialogConfig.width = '100%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';
    (dialogConfig.panelClass = 'full-screen-modal'),
    
    
    this.dialog.open(CertificateComponent,dialogConfig)  ;
   
  }
  
}
