import { Pipe, PipeTransform } from '@angular/core';
import { FNS_DATE_FORMATS } from 'src/app/constants/constant';
import { differenceInDays, format } from 'date-fns'

@Pipe({
  name: 'timeDuration'
})
export class TimeDurationPipe implements PipeTransform {

  /* Depending upon the type of difference we get strings appended  
   with days/day, month/months, or time difference wherever this pipe is applied */

  transform(data: any, type: string): any {
    if (data) {
      try {
        switch (type) {
          case 'TIME_DIFF':
            const startTime = format(new Date(data.startTime), FNS_DATE_FORMATS.TIME);
            const endTime = format(new Date(data.endTime), FNS_DATE_FORMATS.TIME);
            return `${startTime} - ${endTime}`;
          case 'DATE_DIFF':
            const startDate = format(new Date(data.startDate), FNS_DATE_FORMATS.DATE_TYPE1);
            const endDate = format(new Date(data.endDate), FNS_DATE_FORMATS.DATE_TYPE1);
            return `${startDate} to ${endDate}`;
          case 'DAY_DIFF':
            const days = differenceInDays(new Date(data.endDate), new Date(data.startDate)) + 1;
            return `${days} ${days > 1 ? 'days' : 'day'}`;
          default:
            return data;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

}
