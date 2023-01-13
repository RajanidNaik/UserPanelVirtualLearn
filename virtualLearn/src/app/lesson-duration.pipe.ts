import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lessonDuration'
})
export class LessonDurationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let hour = Math.floor(value / 3600);
    let minute = Math.floor((value % 3600)/60);
    let second = Math.floor((value % 3600) % 60);
    let duration="";
    if(hour ==0){
      if(second == 0){
        duration = String(minute)+" mins";
      } else {
        duration = minute+"."+second + " mins";
      }
    } else if(minute == 0){
      duration = String(second)
    } else{
      duration =hour +"."+minute + " hrs"
    }
    
    return duration;

  }

}
