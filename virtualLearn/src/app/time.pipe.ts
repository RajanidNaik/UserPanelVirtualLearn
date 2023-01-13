import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let hour = Math.floor(value / 3600);
    let minute = Math.floor((value % 3600)/60);
    let second = Math.floor((value % 3600) % 60);
    let duration="";
    if(hour ==0){
      if(second == 0){
        duration = minute+" mins ";
      } else {
        duration = minute+" mins "+second + " seconds";
      }
    } else if(minute == 0){
      duration = String(second)
    }
    
    return duration;
  }

}
