import { Pipe, PipeTransform } from '@angular/core';
import { TIME_DIFFERENCE } from 'src/app/constants/enums';
import * as moment from 'moment';

@Pipe({
  name: 'calcTimeDiff'
})
export class CalcTimeDiffPipe implements PipeTransform {


  /*
    Difference Between Clock Out Time And Clock In Time of the shift in Time Sheet Listings 
  */

  transform(value: string, miniMumDate:string, type= TIME_DIFFERENCE.HOURS): unknown {

    if(!value || !miniMumDate){
      return 'NA';
    }

    const maxDate = value;
    const duration = moment.duration(moment(maxDate).diff(moment(miniMumDate)));
    const diffHours = duration.asHours();
    const diffMinutes = duration.asMinutes();

    if(type === TIME_DIFFERENCE.HOURS_MINUTES){
      if((Math.floor(diffMinutes)%60) <= 0){
        return `${Math.floor(diffHours)}h`;
      }else{
        return `${Math.floor(diffHours)}h ${Math.floor(diffMinutes)%60}m`;
      }
    }

    return null;
    
  }

}
