import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'src/app/constants/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { PageConfig, IDate } from 'src/app/models/common.interface';
import { MonthlySelectionComponent } from './monthly-selection/monthly-selection/monthly-selection.component';
import { switchMap } from 'rxjs/operators';
import * as Joi from "joi-browser";
import { PAGE_KEY, LIMIT_KEY, PAGE_OPTION_LIMIT } from 'src/app/constants/constant';
import { UtilityService } from 'src/app/services/utility.service';
import { FormUtils } from 'src/app/constants/form.util';
import { CALENDAR } from 'src/app/constants/routes';
import { MatPaginator } from '@angular/material/paginator';
import { CalendarService } from './calendar.service';
import { MONTH_UPDATE, CUSTOM_HANDLE_ERROR } from 'src/app/constants/enums';
import * as moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends Pagination implements OnInit {
  calendarData = [];

  searchList = new FormControl();
  searchSub: Subscription;


  filterSchema: any;
  sub: Subscription = new Subscription();
  pageConfig: PageConfig;
  calendarList: any[] = [];
  firstTimeLoading = true;
  filterCount = 0;
  currentQueryParams;
  dateRangeConfig: IDate;

  scheduleGroup: FormGroup;
  // scheduleFormArray:FormArray;
  currentWeekDatArray;


  searchSortFilter: FormGroup;



  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private utilService: UtilityService,
    private router:Router,
    private calendarService: CalendarService
  ) {
    super();
    this.createSchema();
    this.createSearchSortFilter();
   }

  ngOnInit(): void {
    
    this.currentQueryParams = this.activatedRoute.snapshot.queryParams;
    this.listenQueryParamChanges();
    this.createScheduleGroup();
  }

    /**
   * Creates search sort filter
   * @returns  filter
   */
  createSearchSortFilter() {
    return (this.searchSortFilter = this.formBuilder.group({
      monthStartDate:[''],
      shiftId:['']
    }));
  }

  /**
   * Creates schema for url
   */
  createSchema() {
    this.filterSchema = Joi.object({
      monthStartDate:Joi.optional().required(),
      shiftId:Joi.optional()
    });
  }

  createScheduleGroup() {
    this.scheduleGroup = this.formBuilder.group({
     shiftId : this.formBuilder.array([]),
    });
    // this.scheduleFormArray = this.formBuilder.array([])
  }

  /**
   * Listens query param changes
   */
  listenQueryParamChanges() {
    this.sub.add(
      this.activatedRoute.queryParams
        .pipe(switchMap((data) => this.validateFilters({ ...data })))
        .subscribe((response) => {
          if (response) {
            
            const calendarShitfs = [...response['data']];
            const selectedMonth = this.searchSortFilter.value.monthStartDate;
            this.calendarData = [...calendarShitfs.filter(items => {
            return moment(selectedMonth).startOf('month') <= moment(items._id) && moment(items._id) <= moment(selectedMonth).endOf('month')   
            })];
              // this.pageConfig = {
              //   total: response["data"]["total"],
              //   currentPage: response["data"]["page"],
              //   pageSize: 10,
              //   isNext: response["data"]["next"],
              // };
              // this.calendarList = [];
              // this.calendarList = [...response["data"]["result"]];
              // this.total = response["data"]["total"];
         
          }
        })
    );
  }

  /**
   * Searchs event
   * @param event event from search box
   */
  searchEvent(event) {
    this.searchSortFilter.get("search").setValue(event);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utilService.formatMomentData(
        FormUtils.parse({
          ...this.searchSortFilter.value,
        })
      ),
    });
  }

  listenFormValueChanges(event) {
    const filterParams = {...this.searchSortFilter.value}
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utilService.formatMomentData(
        FormUtils.parse({
          ...filterParams
        })
      ),
    });
  }

  /**
   * Validates filters
   * @param queryParams from the url
   * @returns  validated query params
   */
  validateFilters(queryParams) {
    // this.filterObject = this.activatedRoute.snapshot.queryParams;
    let slectedParams = {...this.activatedRoute.snapshot.queryParams};

    if (!this.firstTimeLoading) {
      return this.getCalendarList();
    }
    return new Observable((observer) => {
      try {
        Joi.validate(queryParams, this.filterSchema, (err, value: any) => {
          if (err) {
            throw err;
          } else {
            // this.filterObject = { ...this.filterObject, ...value };
       
            this.dateRangeConfig = {
              date: this.searchSortFilter.get("monthStartDate") as FormControl,
            };
            if(slectedParams.shiftId){
              slectedParams.shiftId = slectedParams.shiftId.split(",")
              console.log('woaoaoa',slectedParams)

            }
            this.searchSortFilter.patchValue({...slectedParams});

            this.getCalendarList().subscribe(
              (response) => {
                this.firstTimeLoading = false;
                observer.next(response);
                observer.complete();
              },
              (error) => {
                console.log("eroror", error);
                this.firstTimeLoading = false;
                observer.error(error);
                observer.complete();
              }
            );
          }
        });
      } catch (error) {
        
        console.log('oooso',this.searchSortFilter.value)
        console.error('****erorror',error)   

        this.searchSortFilter.get('monthStartDate').setValue(moment().startOf('month').toISOString())
        this.dateRangeConfig = {
          date: this.searchSortFilter.get("monthStartDate") as FormControl,
        };
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: this.utilService.formatMomentData(
            FormUtils.parse({
              ...this.searchSortFilter.value
            })
          ),
        });
        if(error && error.type === CUSTOM_HANDLE_ERROR.MISSING_DATE){
        }else{
          this.router.navigate([CALENDAR.fullUrl], {
            queryParams: this.utilService.formatMomentData(
              FormUtils.parse({ ...this.searchSortFilter.value })
            ),
          });

        }

      }
    });
  }

  /**
   * All query params
   * @returns  parsed params for safe
   */
  allQueryParams() {
    return this.utilService.formatMomentData(
      FormUtils.parse({
        ...this.searchSortFilter.value,
      })
    );
  }

  /**
   * Gets Schedule list
   * @returns  listing of schedules according to queryparams
   */
  getCalendarList() {
    return this.calendarService.getCalendarMonthlyList(this.allQueryParams());
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }




}
