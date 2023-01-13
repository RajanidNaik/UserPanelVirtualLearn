import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';

const materialComponents = [MatInputModule,MatFormFieldModule,MatIconModule,MatStepperModule,MatDialogModule]



@NgModule({
  
  imports: [
    materialComponents
  ],
  exports:[materialComponents]
})
export class MaterialModule { }
