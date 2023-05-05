import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { GET_MONTHLY_CALENDAR_SCHEDULE, GET_SHIFTS } from 'src/app/constants/urls';
import { FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { PAGE_KEY, LIMIT_KEY, PAGE_OPTION_LIMIT } from 'src/app/constants/constant';

@Injectable()
export class CalendarService {

  constructor(
    private httpService: HttpService,
    private formbuilder: FormBuilder,
    private formService: FormService
  ) { }



  getCalendarMonthlyList(query){
    // query = {...query, ...PAGE_OPTION_LIMIT(10)};
    return this.httpService.get(GET_MONTHLY_CALENDAR_SCHEDULE,query)
  }

  getAllShiftsList(query){
    return this.httpService.get(GET_SHIFTS, query).toPromise();
  }

  createShiftListform(){
    return this.formbuilder.group({
      [PAGE_KEY]:this.formService.getControl("dropdown",true,1),
      [LIMIT_KEY]:this.formService.getControl("dropdown",true,15),
      search: this.formService.getControl("dropdown"),
      // shiftId:this.formService.getControl('dropdown')
    })
  }
}
