import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { CalendarInfoPopupComponent } from '../calendar-info-popup/calendar-info-popup.component';
import { MonthlySelectionComponent } from '../monthly-selection/monthly-selection/monthly-selection.component';
import { MONTH_UPDATE } from 'src/app/constants/enums';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};



@Component({
  selector: 'app-schedule-calender',
  templateUrl: './schedule-calender.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule-calender.component.scss']
})
export class ScheduleCalenderComponent implements OnInit {

  scheduleList: any[] = [];
  colorFormattedArray;
  @Input() propertyId: any;
  isHoliday = false;
  currentDate = new Date();
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  @ViewChild("monthlyCalendarRef")
  monthlyCalendarRef: MonthlySelectionComponent;

  dateRangeConfigObject;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  @Input() set scheduleData(value) {
    if (value) {
    this.scheduleList = value;
    this.setData();
    }
  }

  @Input() set dateRangeConfig(value) {
    if (value) {
      console.log('vlalalaal',value)
    this.dateRangeConfigObject = value;
    }
  }

  @Output() _emitMonthChanged = new EventEmitter();  

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  eventsArray: any[] = [];

  events: CalendarEvent[] = [];

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.setData();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log('***',this.modalData)
  }


  getAllJobIds(calendarData){
    const allJobsId = [];
    calendarData.forEach(items=>{
        if(items.shifts.length){
          allJobsId.push(...items.shifts);
        }
    });
    return allJobsId;
  }

  emitMonthlyChangeConfig(event){
    console.log('checkk this .outt',event)
    this._emitMonthChanged.emit(true)
  }

  setData() {
    if (this.scheduleList.length) {
      let arr = [];

     const jobIds =  this.getAllJobIds(this.scheduleList);

     const uniqueJobs = [...new Set(jobIds.map(item => item.jobId))];
     
     let mappedColorJob = this.arrWithColor(uniqueJobs);
     console.log('**',uniqueJobs,mappedColorJob);
     
      this.scheduleList.forEach(item => {
          const obj = {
            start:  startOfDay(new Date(item._id)),
            end:  endOfDay(new Date(item._id)),
            title:  '',
            color: new Date(item.date) > this.currentDate ? item.colorCode : '#ededed',
            allDay: true,
            csssClass: item.shitfs && item.shifts.length ? "strip-color":'',
            shifts:item.shifts.map(list =>{
                const jobcolor = mappedColorJob.find(jobcolor => jobcolor.jobId === list.jobId).color;
                return {...list,jobcolor}
            }),
            stripColor:item.shifts.length ? "#4CAF50": '',
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          };
        this.events.push(obj);
      });

      this.eventsArray = [...this.events];
      this.events =  [];
    }else{
      this.eventsArray = []
    }
  }


  arrayTwo(array,day) {
    return array.slice(0, 2);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    console.log('helelelee',date,events)
    const dialogRef = this.dialog.open(CalendarInfoPopupComponent, {
      width: '288px',
      data:{date,events:events[0]}
    });

  }

  arrWithColor(arr) {
      let mappedArrayColor = []
        for (let i =0; i< arr.length; i++) {
          let singleJob = {
            jobId:arr[i],
            color:this.getRandomColor()
          }
          mappedArrayColor.push(singleJob);
    }
    return mappedArrayColor;
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getColorByCategory(name) {
    if (name !== '') {
      let obj = this.colorFormattedArray.find(item => item.categoryName === name );
      return obj.color;
    } else {
      return;
    }
  }




  nextWeek() {
    this.monthlyCalendarRef.updateWeekIncDecreement(MONTH_UPDATE.INCREEMENT);
  }

  backWeek() {
    this.monthlyCalendarRef.updateWeekIncDecreement(MONTH_UPDATE.DECREEMENT);
  }

}
