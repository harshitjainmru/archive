import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {

  // difference between the current  date and the value date that has 
  //been passed into the pipe 
  
  transform(value:Date,d2=moment(),type:'days'|'years'='days'): unknown {

    return moment(value).diff(d2,type);
  }

}
