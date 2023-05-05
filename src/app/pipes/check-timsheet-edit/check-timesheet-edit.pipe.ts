import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'checkTimesheetEdit'
})
export class CheckTimesheetEditPipe implements PipeTransform {

  // returns true false depending upon whether element is editable or shiftDate is today or not.
  // If either of them returns true we get True because of || [logical OR] operator

  transform(element: any, ...args: unknown[]): unknown {
    return element?.isEditable || moment(element?.shift?.shiftDate).format('DD-MM-YYYY') === moment(new Date()).format('DD-MM-YYYY')
  }
}
