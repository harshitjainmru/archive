import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import { PageConfig, ICheckBox } from 'src/app/models/common.interface';
import { PAGE_OPTION_LIMIT } from 'src/app/constants/constant';
import { FormGroup, FormControl } from '@angular/forms';
import { SWITCH_CUSTOM_CHECKBOX } from 'src/app/constants/enums';
import { FormUtils } from 'src/app/constants/form.util';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-shifts-selection',
  templateUrl: './shifts-selection.component.html',
  styleUrls: ['./shifts-selection.component.scss']
})
export class ShiftsSelectionComponent implements OnInit {

  shiftsList:any[] = [];
  pageConfig;
  shiftListForm:FormGroup;
  shiftsCheckboxObject:ICheckBox;
  loading = true;
  nextPageStatus = true;


  @Input() searchSortFilter:FormGroup;
  @Output() _emitshiftsChanges = new EventEmitter()

  constructor(
    private calendarService: CalendarService,
    private utilService: UtilityService
  ) { 
    this.createShiftListform()

  }

  ngOnInit(): void {
    this.shiftsCheckboxObject = {
      list: [],
      control: this.searchSortFilter.get("shiftId") as FormControl,
      label: "",
      viewKey: "title",
      valueKey: "timeSlotId",
      selectedList:[],
      type:SWITCH_CUSTOM_CHECKBOX.CALENDAR_CHECKBOX
    };
    this.getShiftsList();

  }


  createShiftListform(){
    this.shiftListForm = this.calendarService.createShiftListform()
    this.shiftListForm.get('shiftId');
  }

  async getShiftsList(refresh = false){
    try{
      this.loading = true;
      const queryData =this.utilService.formatMomentData(
            FormUtils.parse({...this.shiftListForm.value, ...this.searchSortFilter.value})
          );
      delete queryData.shiftId;
      const shiftData = await this.calendarService.getAllShiftsList({...queryData});

      if(refresh){
        this.shiftsList = [...shiftData.data.result];
        this.shiftsCheckboxObject = {...this.shiftsCheckboxObject, list:[...this.shiftsList ]}

      }else{
        this.shiftsList = [...this.shiftsList,...shiftData.data.result ||[]];
        this.shiftsCheckboxObject = {...this.shiftsCheckboxObject, list:[...this.shiftsList ]}
      }


      console.log('shifififif',shiftData)
      this.nextPageStatus = shiftData.data.next;
      this.loading = false;

      this.shiftListForm.get("page").setValue(this.shiftListForm.get("page").value +1);
    }catch(error){
      this.loading = false;

    }
  }


  shiftIdChanged(shiftIds){
    console.log('ememememe',shiftIds)
    // this.searchSortFilter.get("shiftId").setValue(shiftIds);
    this._emitshiftsChanges.emit(true);
  }

  searchEvent(event){
    this.shiftListForm.get("search").setValue(event);
    this.shiftListForm.get('page').setValue(1);
    this.getShiftsList(true)
  }

}
