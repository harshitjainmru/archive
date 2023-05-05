import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  SCHEDULE_SHIFT_SORTING,
  PAGE_KEY,
  LIMIT_KEY,
  PAGE_OPTION_LIMIT,
  JOB_LIST_SORTING,
  SESSION_KEYS,
} from "src/app/constants/constant";
import { ScheduleShiftFilterComponent } from "./schedule-shift-filter/schedule-shift-filter.component";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Form,
  FormArray,
} from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import {
  PageConfig,
  Schedule_List,
  IDateRange,
} from "src/app/models/common.interface";
import { MatTableDataSource } from "@angular/material/table";
import { ScheduleService } from "../schedule.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilityService } from "src/app/services/utility.service";
import * as Joi from "joi-browser";
import { FormUtils } from "src/app/constants/form.util";
import { switchMap } from "rxjs/operators";
import { Pagination } from "src/app/constants/pagination";
import { SCHEDULE_SIFT } from "src/app/constants/routes";
import { MatPaginator } from "@angular/material/paginator";
import {
  DIALOG_RESPONSE,
  WEEK_UPDATE,
  SCHEDULE_JOB_STATUS,
  CUSTOM_HANDLE_ERROR,
  CANDIDATE_STATUS,
  CUSTOM_DATE_FORMATS,
} from "src/app/constants/enums";
import { WeeklyCalendarSelectorComponent } from "src/app/modules/common/modules/weekly-calendar-selector/weekly-calendar-selector.component";
import * as moment from "moment";
import { HttpErrorResponse } from "@angular/common/http";
import { WarningPopupComponent } from "./warning-popup/warning-popup.component";
import { Location } from "@angular/common";
import { ScheduleInfoPopupComponent } from "./schedule-info-popup/schedule-info-popup.component";
import { IPopupData } from "src/app/models/popup";
import { POPUP_MESSAGES } from "src/app/constants/messages";

@Component({
  selector: "app-schedule-shift",
  templateUrl: "./schedule-shift.component.html",
  styleUrls: ["./schedule-shift.component.scss"],
})
export class ScheduleShiftComponent extends Pagination implements OnInit {
  displayedColumns: string[] = [
    "name",
    "day-first",
    "day-second",
    "day-third",
    "day-fourth",
    "day-fifth",
    "day-sixth",
    "day-sixth",
    "day-seventh",
  ];
  sorting = "Sort by";
  shiftMatMenu = SCHEDULE_SHIFT_SORTING;

  searchList = new FormControl();
  searchSub: Subscription;

  filterObject: {
    page?: number;
    status?: number;
    limit?: number;
    sortOrder?;
    sortKey?;
  } = {
    page: 1,
    limit: 10,
  };
  searchSortFilter: FormGroup;
  filterSchema: any;
  sub: Subscription = new Subscription();
  pageConfig: PageConfig;
  dataSource = new MatTableDataSource<Schedule_List>([]);
  scheduleList: any[] = [];
  firstTimeLoading = true;
  filterCount = 0;
  currentQueryParams;
  dateRangeConfig: IDateRange;

  scheduleGroup: FormGroup;
  // scheduleFormArray:FormArray;
  currentWeekDatArray;

  @ViewChild("weeklyCalendarRef")
  weeklyCalendarRef: WeeklyCalendarSelectorComponent;
  scheduleJobStatus = SCHEDULE_JOB_STATUS;
  isImport: boolean = false;
  workerId: string;
  editable: number = 2;
  @ViewChild("customTooltip") customTooltip: ElementRef;

  nullifyError = false;
  savedFormData;
  customDateFormats = CUSTOM_DATE_FORMATS;
  deleteImportId = false;

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    super();
    this.pageOptions = [10];
    this.currentQueryParams = this.removeEditable(
      this.activatedRoute.snapshot.queryParams
    );
  }

  ngOnInit(): void {
    this.createSchema();
    this.createSearchSortFilter();
    this.searchSortFilter.patchValue(this.currentQueryParams);
    this.isImport = false;
    this.listenQueryParamChanges();
    this.createScheduleGroup();
  }

  get scheduleFormArray() {
    return this.scheduleGroup.get("scheduleInfoArray") as FormArray;
  }

  /**
   * Creates search sort filter
   * @returns  filter
   */
  createSearchSortFilter() {
    return (this.searchSortFilter = this.formBuilder.group({
      search: [""],
      workerId: [""],
      editable: [""],
      status: [""],
      jobSite: [""],
      jobRole: [""],
      fromDate: [""],
      toDate: [""],
      [PAGE_KEY]: [""],
      [LIMIT_KEY]: [""],
      sortKey: [""],
      sortOrder: [""],
    }));
  }

  /**
   * Creates schema for url
   */
  createSchema() {
    this.filterSchema = Joi.object({
      search: Joi.optional(),
      workerId: Joi.optional(),
      editable: Joi.optional(),
      status: Joi.optional(),
      jobSite: Joi.optional(),
      jobRole: Joi.optional(),
      fromDate: Joi.optional(),
      toDate: Joi.optional(),
      [PAGE_KEY]: Joi.number().min(1).required(),
      [LIMIT_KEY]: Joi.number(),
      sortKey: Joi.optional(),
      sortOrder: Joi.optional(),
    });
  }

  createScheduleGroup() {
    this.scheduleGroup = this.formBuilder.group({
      scheduleInfoArray: this.formBuilder.array([]),
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
            if (this.isImport) {
              this.importScheduleData([...response["data"]["result"]]);
            } else {
              this.pageConfig = {
                total: response["data"]["total"],
                currentPage: response["data"]["page"],
                pageSize: 10,
                isNext: response["data"]["next"],
              };
              this.utilService.clearFormArray(this.scheduleFormArray);
              this.scheduleList = [];
              this.scheduleList = [...response["data"]["result"]];
              console.log(this.scheduleList);
              this.total = response["data"]["total"];
              this.assignScheduleData();

              if (this.editable == 1) {
                this.scheduleList.forEach((item, idx) => {
                  this.editSchedule(idx);
                });
              }
            }
            this.sorting =
              this.searchSortFilter.value.sortKey != ""
                ? SCHEDULE_SHIFT_SORTING.find(
                    (list) =>
                      list.sortKey == this.searchSortFilter.value.sortKey
                  )
                  ? SCHEDULE_SHIFT_SORTING.find(
                      (list) =>
                        list.sortKey == this.searchSortFilter.value.sortKey
                    ).name
                  : "Sort By"
                : "Sort By";
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
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
    });
  }

  listenFormValueChanges(event) {
    const filterParams = {
      ...this.filterObject,
      ...this.searchSortFilter.value,
      editable: this.editable,
    };
    console.log(this.filterObject);

    this.isImport = false;
    this.deleteImportId = false;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utilService.formatMomentData(
        FormUtils.parse({
          ...filterParams,
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
    if (
      this.removeEditable(this.activatedRoute.snapshot.queryParams)["workerId"]
    ) {
      this.workerId = this.removeEditable(
        this.activatedRoute.snapshot.queryParams
      )["workerId"];
    } else {
      this.workerId = "";
      this.searchSortFilter.controls.workerId.patchValue("");
    }
    this.filterObject = this.removeEditable(
      this.activatedRoute.snapshot.queryParams
    );
    if (!this.firstTimeLoading && !this.filterObject) {
      return this.getScheuleShift(true);
    }
    return new Observable((observer) => {
      try {
        Joi.validate(
          this.removeEditable(queryParams),
          this.filterSchema,
          (err, value: any) => {
            if (err) {
              throw err;
            } else {
              this.filterObject = { ...this.filterObject, ...value };
              this.dateRangeConfig = {
                startDate: this.searchSortFilter.get("fromDate") as FormControl,
                endDate: this.searchSortFilter.get("toDate") as FormControl,
                iSaveAllowed: new FormControl(true),
              };
              this.searchSortFilter.patchValue(this.filterObject);
              this.firstTimeLoading = false;
              this.filterCount = Object.keys(this.filterObject).length - 4;
              if (this.filterObject.sortKey) {
                this.filterCount = this.filterCount - 2;
              }
              this.getScheuleShift().subscribe(
                (response) => {
                  this.firstTimeLoading = false;
                  observer.next(response);
                  observer.complete();
                },
                (error) => {
                  console.error("eroror", error);
                  this.firstTimeLoading = false;
                  observer.error(error);
                  observer.complete();
                }
              );
            }
          }
        );
      } catch (error) {
        console.error("erorror", error);
        this.filterObject = {
          ...PAGE_OPTION_LIMIT(10),
          ...this.utilService.getISOStartAndEndOfWeek(),
        };

        this.router.navigate([SCHEDULE_SIFT.fullUrl], {
          queryParams: this.utilService.formatMomentData(
            FormUtils.parse({ ...this.filterObject })
          ),
        });
      }
    });
  }

  /**
   * All query params
   * @returns  parsed params for safe
   */
  allQueryParams(extendFilters = {}) {
    return this.utilService.formatMomentData(
      FormUtils.parse({
        ...extendFilters,
        ...this.filterObject,
        // ...this.searchSortFilter.value,
        ...this.pageParams,
      })
    );
  }

  /**
   * Gets Schedule list
   * @returns  listing of schedules according to queryparams
   */
  getScheuleShift(extendFilters = false) {
    return this.scheduleService.scheduleShiftListing(
      this.allQueryParams(extendFilters ? this.searchSortFilter.value : {}),
      this.isImport
    );
  }

  /**
   * Changes page
   * @param event event of paginator
   * @returns  redirect according to queryparams
   */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total === 0) {
      return;
    }
    this.filterObject = {
      ...this.filterObject,
      page: event.pageIndex + 1,
      limit: event.pageSize,
    };
    const { fromDate, toDate } = this.searchSortFilter.value;
    this.searchSortFilter.patchValue({
      ...this.searchSortFilter.value,
      ...this.filterObject,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
    });

    const qqueryParams = {
      ...this.filterObject,
      ...this.searchSortFilter.value,
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utilService.formatMomentData(
        FormUtils.parse({
          ...qqueryParams,
        })
      ),
      queryParamsHandling: "merge",
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
    this.utilService.clearSessionStorage(SESSION_KEYS.JOB_FILTER_JOB_AREA);
    this.utilService.clearSessionStorage(SESSION_KEYS.JOB_ROLE_FILTER);
  }

  selectMenu(item) {
    const { sortKey, sortOrder } = item;
    this.sorting = item.name;
    this.searchSortFilter.patchValue({
      ...this.searchSortFilter.value,
      sortOrder,
      sortKey,
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utilService.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
    });
    // this.filterObject = {...this.filterObject, ...PAGE_OPTION_LIMIT(5), sortKey, sortOrder};
    // this.getScheuleShift()
    // this.getScheuleShift({ sortKey, sortOrder, limit: 10 });
  }

  onFilterHandler() {
    const subscription = this.dialog
      .open(ScheduleShiftFilterComponent, {
        width: "464px",
        panelClass: "custom_filter",
        height: "100vh",
        disableClose: true,
        autoFocus: false,
        data:
          this.filterObject && Object.keys(this.filterObject).length > 0
            ? { ...this.filterObject }
            : {},
      })
      .afterClosed()
      .subscribe((filterValue = {}) => {
        const searchfilterValue = { ...this.searchSortFilter.value };
        const { fromDate, toDate } = searchfilterValue;

        if (filterValue.type === DIALOG_RESPONSE.DISMISS) {
          return;
        }
        if (filterValue && filterValue.type === DIALOG_RESPONSE.APPLY) {
          this.filterCount = Object.keys(filterValue.data).length;

          // this.searchSortFilter.reset();
          this.filterObject = {
            ...PAGE_OPTION_LIMIT(10),
            ...filterValue.data,
            fromDate,
            toDate,
          };
          this.searchSortFilter.patchValue({ ...filterValue.data });

          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: this.utilService.formatMomentData(
              FormUtils.parse({ ...this.filterObject })
            ),
            // queryParamsHandling: 'merge',
          });
        } else {
          this.filterCount = 0;
          this.searchSortFilter.reset();
          this.filterObject = { ...PAGE_OPTION_LIMIT(10) };
          this.searchSortFilter.patchValue({
            ...this.filterObject,
            fromDate,
            toDate,
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: this.utilService.formatMomentData(
              FormUtils.parse({
                ...this.filterObject,
                fromDate,
                toDate,
              })
            ),
            // queryParamsHandling: 'merge',
          });
        }
      });
  }

  openScheduleInfo(scheduleIndex) {
    const scheduleFormValue = this.scheduleFormArray.at(scheduleIndex).value;

    const subscription = this.dialog.open(ScheduleInfoPopupComponent, {
      width: "400px",
      disableClose: true,
      autoFocus: false,
      data: {
        ...scheduleFormValue,
        job: this.scheduleList[scheduleIndex]?.job,
      },
    });
  }

  nextWeek() {
    this.weeklyCalendarRef.updateWeekIncDecreement(WEEK_UPDATE.INCREEMENT);
  }

  backWeek() {
    this.weeklyCalendarRef.updateWeekIncDecreement(WEEK_UPDATE.DECREEMENT);
  }

  assignScheduleData() {
    for (let i = 0; i < this.scheduleList.length; i++) {
      const scheduleFormGroup = this.scheduleService.createScheduleGroup();

      const { fromDate, toDate } = this.searchSortFilter.value;
      const startEndWekkObj = this.utilService.formatMomentData({
        fromDate,
        toDate,
      });

      const item = this.scheduleList[i];
      const lastcontractStatus = item.applyStatus[item.applyStatus.length - 1];
      const applicantInfo = {
        userId: item.applicant._id,
        employerId: item.job.user._id,
        applyJobId: item._id,
        startOfWeek: startEndWekkObj.fromDate,
        endOfWeek: moment(startEndWekkObj.toDate).endOf("day").toISOString(),
        fullName: item.applicant.fullName,
        profileImage: item.applicant.profilePic,
        jobId: item.job.jobId,
        employee_id: item.employee_id,
        placement_id: item.placement_id,
        email: item.applicant.email,
      };

      const jobtimeLine = item.job.timeline;

      scheduleFormGroup.get("applicant").patchValue({ ...applicantInfo });
      console.log(scheduleFormGroup.value);

      scheduleFormGroup.get("timeline").patchValue({ ...jobtimeLine });

      scheduleFormGroup.get("jobRole").patchValue({ ...item.job.jobRole });

      scheduleFormGroup
        .get("isActionedByUser")
        .setValue(
          item.shiftData &&
            item.shiftData.shift &&
            item.shiftData.isActionedByUser
            ? true
            : item.shiftData && item.shiftData.shift
            ? item.shiftData.isActionedByUser
            : ""
        );

      if (item.shiftData && item.shiftData.shift.length) {
        scheduleFormGroup.get("isImport").setValue(false);
      } else {
        scheduleFormGroup.get("isImport").setValue(true);
      }

      scheduleFormGroup
        .get("workingHours")
        .patchValue({ ...item.job.workingHours });

      const timeSlots = item.preferredJobSite.timeSlots;

      for (let j = 0; j < timeSlots.length; j++) {
        const timeSlotFormGroup =
          this.scheduleService.createSingleTimeslotGroup();
        timeSlotFormGroup.patchValue({ ...timeSlots[j] });
        (scheduleFormGroup.get("timeSlots") as FormArray).push(
          timeSlotFormGroup
        );
      }

      this.currentWeekDatArray = this.utilService.getDates(
        this.searchSortFilter.value.fromDate,
        this.searchSortFilter.value.toDate
      );

      if (item.shiftData && item.shiftData.shift.length) {
        const shiftItems = item.shiftData.shift;
        for (let k = 0; k < this.currentWeekDatArray.length; k++) {
          const shiftDataFormGroup = this.scheduleService.createShiftDataForm();
          const isShiftItemPresent = shiftItems.find(
            (list) =>
              moment(list.shiftDate).toString() ===
              moment(this.currentWeekDatArray[k]).startOf("day").toString()
          );

          if (isShiftItemPresent) {
            console.log("isShiftItemPresent", isShiftItemPresent);

            scheduleFormGroup
              .get("isEdit")
              .setValue(this.dateRangeConfig?.iSaveAllowed.value);
            if (this.checkDate(item.job.timeline.endDate)) {
              scheduleFormGroup.get("isEdit").setValue(false);
              console.log(scheduleFormGroup);
            }
            scheduleFormGroup.get("shiftId").setValue(item.shiftData.shiftId);

            shiftDataFormGroup.patchValue({
              control:
                isShiftItemPresent.status === SCHEDULE_JOB_STATUS.REST
                  ? {
                      ...isShiftItemPresent,
                      _id: "NA",
                      timeSlotsId: "NA",
                      additionalAllowance:
                        item.preferredTimeSlot.additionalAllowance?.salary,
                    }
                  : {
                      ...isShiftItemPresent,
                      isPreferredTimeSlot:
                        item.preferredTimeSlot._id ===
                        isShiftItemPresent.timeSlotsId
                          ? true
                          : false,
                      additionalAllowance:
                        item.preferredTimeSlot.additionalAllowance?.salary,
                    },
              list: [
                ...item.preferredJobSite.timeSlots.map((dateItems) => {
                  return {
                    ...dateItems,
                    timeSlotsId: dateItems._id,
                    _id: isShiftItemPresent._id,
                    isPreferredTimeSlot:
                      item.preferredTimeSlot._id === dateItems._id
                        ? true
                        : false,
                    status:
                      moment(this.currentWeekDatArray[k]) <
                        moment(jobtimeLine.startDate) ||
                      moment(this.currentWeekDatArray[k]) >
                        moment(jobtimeLine.endDate)
                        ? SCHEDULE_JOB_STATUS.NON_WORKING
                        : SCHEDULE_JOB_STATUS.WORKING,
                    shiftDate: moment(this.currentWeekDatArray[k])
                      .startOf("day")
                      .toISOString(),
                    additionalAllowance: dateItems.additionalAllowance?.salary,
                  };
                }),

                {
                  _id: "NA",
                  status: SCHEDULE_JOB_STATUS.REST,
                  title: "Off day",
                  shiftDate: moment(this.currentWeekDatArray[k])
                    .startOf("day")
                    .toISOString(),
                  timeSlotsId: "NA",
                  additionalAllowance: 0,
                },
              ],
              isDisabled: true,
            });
          } else {
            const preferredTimeSlot = {
              startTime: item.preferredTimeSlot.startTime,
              endTime: item.preferredTimeSlot.endTime,
              title: item.preferredTimeSlot.title,
            };
            shiftDataFormGroup.patchValue({
              control: {
                ...preferredTimeSlot,
                timeSlotsId: item.preferredTimeSlot._id,
                isPreferredTimeSlot: true,
                totalHours:
                  moment(this.currentWeekDatArray[k]) <= moment(new Date())
                    ? 0
                    : this.utilService.getTotalHours(item.preferredTimeSlot),
                status:
                  moment(this.currentWeekDatArray[k]) <
                    moment(jobtimeLine.startDate) ||
                  moment(this.currentWeekDatArray[k]) >
                    moment(jobtimeLine.endDate)
                    ? SCHEDULE_JOB_STATUS.NON_WORKING
                    : SCHEDULE_JOB_STATUS.WORKING,
                shiftDate: moment(this.currentWeekDatArray[k])
                  .startOf("day")
                  .toISOString(),
                additionalAllowance:
                  item.preferredTimeSlot.additionalAllowance?.salary,
              },
              list: [
                ...item.preferredJobSite.timeSlots.map((dateItems) => {
                  return {
                    ...dateItems,
                    timeSlotsId: dateItems._id,
                    isPreferredTimeSlot:
                      item.preferredTimeSlot._id === dateItems._id
                        ? true
                        : false,
                    status:
                      moment(this.currentWeekDatArray[k]) <
                        moment(jobtimeLine.startDate) ||
                      moment(this.currentWeekDatArray[k]) >
                        moment(jobtimeLine.endDate)
                        ? SCHEDULE_JOB_STATUS.NON_WORKING
                        : SCHEDULE_JOB_STATUS.WORKING,
                    shiftDate: moment(this.currentWeekDatArray[k])
                      .startOf("day")
                      .toISOString(),
                    additionalAllowance: dateItems.additionalAllowance?.salary,
                  };
                }),
                {
                  _id: "NA",
                  status: SCHEDULE_JOB_STATUS.REST,
                  title: "Off day",
                  shiftDate: moment(this.currentWeekDatArray[k])
                    .startOf("day")
                    .toISOString(),
                  timeSlotsId: "NA",
                  additionalAllowance: 0,
                },
              ],
              isDisabled:
                moment(this.currentWeekDatArray[k]).format("MM/DD/YYYY") <=
                moment(new Date()).format("MM/DD/YYYY"),
            });
          }

          (scheduleFormGroup.get("shiftData") as FormArray).push(
            shiftDataFormGroup
          );
        }
      } else {
        for (let k = 0; k < this.currentWeekDatArray.length; k++) {
          const shiftDataFormGroup = this.scheduleService.createShiftDataForm();

          const preferredTimeSlot = {
            startTime: item.preferredTimeSlot.startTime,
            endTime: item.preferredTimeSlot.endTime,
            title: item.preferredTimeSlot.title,
          };

          shiftDataFormGroup.patchValue({
            control: {
              ...preferredTimeSlot,
              timeSlotsId: item.preferredTimeSlot._id,
              isPreferredTimeSlot: true,
              totalHours:
                moment(this.currentWeekDatArray[k]) <= moment(new Date())
                  ? 0
                  : this.utilService.getTotalHours(item.preferredTimeSlot),
              status:
                lastcontractStatus.action === CANDIDATE_STATUS.CONTRACT_SIGNED
                  ? moment(this.currentWeekDatArray[k]) <
                      moment(item.contractStartAt).startOf("day") ||
                    moment(this.currentWeekDatArray[k]) <
                      moment(jobtimeLine.startDate).startOf("day") ||
                    moment(this.currentWeekDatArray[k]) >
                      moment(jobtimeLine.endDate).startOf("day")
                    ? SCHEDULE_JOB_STATUS.NON_WORKING
                    : SCHEDULE_JOB_STATUS.WORKING
                  : SCHEDULE_JOB_STATUS.NON_WORKING,

              shiftDate: moment(this.currentWeekDatArray[k])
                .startOf("day")
                .toISOString(),
              additionalAllowance:
                item.preferredTimeSlot.additionalAllowance?.salary,
            },
            list: [
              ...item.preferredJobSite.timeSlots.map((dateItems) => {
                return {
                  ...dateItems,
                  timeSlotsId: dateItems._id,
                  isPreferredTimeSlot:
                    item.preferredTimeSlot._id === dateItems._id ? true : false,
                  status:
                    moment(this.currentWeekDatArray[k]) <
                      moment(jobtimeLine.startDate) ||
                    moment(this.currentWeekDatArray[k]) >
                      moment(jobtimeLine.endDate)
                      ? SCHEDULE_JOB_STATUS.NON_WORKING
                      : SCHEDULE_JOB_STATUS.WORKING,
                  shiftDate: moment(this.currentWeekDatArray[k])
                    .startOf("day")
                    .toISOString(),
                  additionalAllowance: dateItems.additionalAllowance?.salary,
                };
              }),

              {
                _id: "NA",
                status: SCHEDULE_JOB_STATUS.REST,
                title: "Off day",
                shiftDate: moment(this.currentWeekDatArray[k])
                  .startOf("day")
                  .toISOString(),
                timeSlotsId: "NA",
                additionalAllowance: 0,
              },
            ],
            isDisabled:
              moment(this.currentWeekDatArray[k]).format("MM/DD/YYYY") <=
              moment(new Date()).format("MM/DD/YYYY"),
          });

          (scheduleFormGroup.get("shiftData") as FormArray).push(
            shiftDataFormGroup
          );
        }
      }

      this.scheduleFormArray.push(scheduleFormGroup);
    }
  }

  importScheduleData(importedScheduleList) {
    const scheduleFormArray = [...this.scheduleFormArray.value];

    const currentImportScheduleData = [...importedScheduleList];

    for (let i = 0; i < currentImportScheduleData.length; i++) {
      const indexCurrentData = currentImportScheduleData[i];
      const existedScheduleDataIndex = scheduleFormArray.findIndex(
        (items) =>
          items.applicant.userId === indexCurrentData.applicant._id &&
          items.isImport
      );
      if (existedScheduleDataIndex >= 0) {
        const updatedShidtData = indexCurrentData.shiftData.shift;
        for (let j = 0; j < updatedShidtData.length; j++) {
          const shiftDataFormGroup = this.scheduleService.createShiftDataForm();

          shiftDataFormGroup.patchValue({
            ...scheduleFormArray[existedScheduleDataIndex].shiftData[j],
            // control: isShiftItemPresent.status === SCHEDULE_JOB_STATUS.REST ? {...isShiftItemPresent, _id:"NA" , timeSlotsId:'NA'} : isShiftItemPresent,

            control: {
              ...updatedShidtData[j],
              shiftDate:
                scheduleFormArray[existedScheduleDataIndex].shiftData[j].control
                  .shiftDate,
              _id:
                updatedShidtData[j].status === SCHEDULE_JOB_STATUS.REST
                  ? "NA"
                  : updatedShidtData[j]._id,

              timeSlotsId:
                updatedShidtData[j].status === SCHEDULE_JOB_STATUS.REST
                  ? "NA"
                  : updatedShidtData[j].timeSlotsId,
              status:
                moment(
                  scheduleFormArray[existedScheduleDataIndex].shiftData[j]
                    .control.shiftDate
                ) >
                moment(
                  scheduleFormArray[existedScheduleDataIndex].timeline.endDate
                )
                  ? SCHEDULE_JOB_STATUS.NON_WORKING
                  : updatedShidtData[j].status ===
                    SCHEDULE_JOB_STATUS.NON_WORKING
                  ? SCHEDULE_JOB_STATUS.WORKING
                  : updatedShidtData[j].status,
            },
          });
          (
            this.scheduleFormArray
              .at(existedScheduleDataIndex)
              .get("shiftData") as FormArray
          ).removeAt(j);
          (
            this.scheduleFormArray
              .at(existedScheduleDataIndex)
              .get("shiftData") as FormArray
          ).insert(j, shiftDataFormGroup);

          // (this.scheduleFormArray.at(existedScheduleDataIndex).get('shiftData') as FormArray).at(j).setValue(shiftDataFormGroup.value);
        }
      }
    }
  }

  async importLastWeek() {
    try {
      const scheduleFormArray = [...this.scheduleFormArray.value];
      if (!scheduleFormArray.length) {
        this.utilService.showAlert("There are no user to import data!");
        return;
      }

      this.filterObject = { ...PAGE_OPTION_LIMIT(10) };
      const qqueryParams = this.utilService.formatMomentData({
        ...this.filterObject,
        ...this.searchSortFilter.value,
      });
      this.isImport = true;

      const response = await this.scheduleService
        .scheduleShiftListing(qqueryParams, this.isImport)
        .toPromise();
      if (response.data.result && response.data.result.length) {
        this.utilService.showAlert("Data imported successfully");
        this.importScheduleData([...response["data"]["result"]]);
        this.deleteImportId = true;
      } else {
        this.utilService.showAlert("No data available to import!");
      }
      this.isImport = false;
    } catch (error) {
      this.isImport = false;
    }

    // this.router.navigate(['.'], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: this.utilService.formatMomentData(
    //     FormUtils.parse({ ...qqueryParams })
    //   ),
    //   // queryParamsHandling: 'merge',
    // });
  }

  cancelAction(formArrayIndex) {
    const formArrayValue = {
      ...this.scheduleFormArray.at(formArrayIndex).value,
    };
    this.utilService.clearFormArray(
      this.scheduleFormArray.at(formArrayIndex).get("shiftData") as FormArray
    );
    const shiftData = formArrayValue.shiftData;
    for (let i = 0; i < shiftData.length; i++) {
      const shiftItemData = shiftData[i];
      const shiftDataFormGroup = this.scheduleService.createShiftDataForm();

      shiftDataFormGroup.patchValue({
        ...shiftItemData,
        // isDisabled:!(shiftItemData.control.status === SCHEDULE_JOB_STATUS.WORKING || shiftItemData.control.status === SCHEDULE_JOB_STATUS.REST)
        isDisabled: true,
      });
      (
        this.scheduleFormArray.at(formArrayIndex).get("shiftData") as FormArray
      ).push(shiftDataFormGroup);
    }

    this.scheduleFormArray.at(formArrayIndex).get("isImport").setValue(true);

    this.scheduleFormArray
      .at(formArrayIndex)
      .get("isSave")
      .setValue(!formArrayValue.isSave);
    this.scheduleFormArray
      .at(formArrayIndex)
      .get("isEdit")
      .setValue(!formArrayValue.isEdit);
  }

  editSchedule(formArrayIndex) {
    try {
      const formArrayValue = {
        ...this.scheduleFormArray.at(formArrayIndex).value,
      };
      console.log(formArrayValue);

      //current edit state is active
      if (formArrayValue.isEdit) {
        this.utilService.clearFormArray(
          this.scheduleFormArray
            .at(formArrayIndex)
            .get("shiftData") as FormArray
        );
        const shiftData = formArrayValue.shiftData;
        for (let i = 0; i < shiftData.length; i++) {
          const shiftItemData = shiftData[i];
          const shiftDataFormGroup = this.scheduleService.createShiftDataForm();

          shiftDataFormGroup.patchValue({
            ...shiftItemData,
            // isDisabled:!(shiftItemData.control.status === SCHEDULE_JOB_STATUS.WORKING || shiftItemData.control.status === SCHEDULE_JOB_STATUS.REST)
            isDisabled:
              moment(shiftItemData.control.shiftDate) <= moment(new Date()),
          });
          (
            this.scheduleFormArray
              .at(formArrayIndex)
              .get("shiftData") as FormArray
          ).push(shiftDataFormGroup);
        }

        this.scheduleFormArray
          .at(formArrayIndex)
          .get("isImport")
          .setValue(true);

        this.scheduleFormArray
          .at(formArrayIndex)
          .get("isSave")
          .setValue(!formArrayValue.isSave);
        this.scheduleFormArray
          .at(formArrayIndex)
          .get("isEdit")
          .setValue(!formArrayValue.isEdit);
      }

      //saving state
      if (formArrayValue.isSave) {
        this.saveSchedule(true, formArrayValue, formArrayIndex);
        this.scheduleFormArray
          .at(formArrayIndex)
          .get("isImport")
          .setValue(false);
      }
    } catch (error) {
      console.error("erororororr", error);
    }
  }

  singleScheduleSave(singleFormEdit) {
    let formData;
    singleFormEdit = {
      ...singleFormEdit.applicant,
      workingHours: singleFormEdit.workingHours,
      shift: singleFormEdit.shiftData.map((list) => {
        delete list.control.isPreferredTimeSlot;

        if (this.deleteImportId) {
          delete list.control._id;
        }
        if (
          list.control.status === SCHEDULE_JOB_STATUS.REST &&
          list.control._id === "NA"
        ) {
          delete list.control._id;
          delete list.control.timeSlotsId;
        }

        //shift_date asked by Ankit Nautiyal
        list.control.shift_date = moment(list.control.shiftDate).format(
          "MM/DD/YYYY"
        );
        //aproved by worked condition asked by Varun garg
        if (
          moment(list.control.shiftDate).format("MM/DD/YYYY") >
          moment().format("MM/DD/YYYY")
        ) {
          list.control.isApprovedByWorker = false;
        } else {
          list.control.isApprovedByWorker = list.control.isApprovedByWorker
            ? list.control.isApprovedByWorker
            : false;
        }
        return {
          ...list.control,
          // additionalAllowance:list.control?.additionalAllowance?.salary ? list.control?.additionalAllowance?.salary : 0  //Asked by Ankit Nautiyal
        };
      }),
      totalShiftHours: singleFormEdit.shiftData.reduce(
        (currentSum, element) => {
          return currentSum + element.control.totalHours;
        },
        0
      ),
      totalWorkingDays: singleFormEdit.shiftData.reduce(
        (currentSum, element) => {
          if (element.control.status === SCHEDULE_JOB_STATUS.WORKING) {
            return currentSum + 1;
          } else {
            return currentSum;
          }
        },
        0
      ),
      timeline: singleFormEdit.timeline,
      shiftId: singleFormEdit.shiftId,
    };
    if (singleFormEdit.shiftId === "") {
      delete singleFormEdit.shiftId;
    }
    delete singleFormEdit.profileImage;
    formData = [{ ...singleFormEdit }];
    return formData;
  }

  async saveSchedule(
    singleEdit = false,
    singleFormEdit?,
    singleFormIndex = 0,
    nullifyError = false
  ) {
    let formData;
    try {
      let data: IPopupData = {
        title: POPUP_MESSAGES.confrim,
        message: POPUP_MESSAGES.scheduleConfirm,
        cancelButtonText: POPUP_MESSAGES.cancel,
        hideConfirmButton: true,
      };
      if (!nullifyError) {
        const resp = await this.utilService.openDialog(data).toPromise();
        if (resp) {
          console.log(
            "where is bug",
            singleFormEdit,
            ...this.scheduleFormArray.value
          );

          if (!singleEdit) {
            let scheduleFormArrayData = [...this.scheduleFormArray.value];
            const checkEditMode = (item) => item.isEdit;
            const isallEditMode = scheduleFormArrayData.every((items) =>
              checkEditMode(items)
            );
            if (isallEditMode) {
              this.utilService.showAlert(
                "All schedule data is already in saved mode !"
              );
              return;
            }

            scheduleFormArrayData = scheduleFormArrayData.filter(
              (items) => !items.isEdit
            );

            formData = scheduleFormArrayData.map((items) => {
              let itemObj = {
                ...items.applicant,
                workingHours: items.workingHours,
                shift: items.shiftData.map((list) => {
                  delete list.control.isPreferredTimeSlot;
                  if (this.deleteImportId) {
                    delete list.control._id;
                  }

                  if (
                    list.control.status === SCHEDULE_JOB_STATUS.REST &&
                    list.control._id === "NA"
                  ) {
                    delete list.control._id;
                    delete list.control.timeSlotsId;
                  }

                  //shift_date asked by Ankit Nautiyal

                  list.control.shift_date = moment(
                    list.control.shiftDate
                  ).format("MM/DD/YYYY");

                  //aproved by worked condition asked by Varun garg
                  if (
                    moment(list.control.shiftDate).format("MM/DD/YYYY") >
                    moment().format("MM/DD/YYYY")
                  ) {
                    list.control.isApprovedByWorker = false;
                  } else {
                    list.control.isApprovedByWorker = list.control
                      .isApprovedByWorker
                      ? list.control.isApprovedByWorker
                      : false;
                  }
                  return {
                    ...list.control,
                    // additionalAllowance:list.control?.additionalAllowance?.salary ? list.control?.additionalAllowance?.salary : 0  //Asked by Ankit Nautiyal
                  };
                }),

                //total hours
                totalShiftHours: items.shiftData.reduce(
                  (currentSum, element) => {
                    return currentSum + element.control.totalHours;
                  },
                  0
                ),

                //total working days
                totalWorkingDays: items.shiftData.reduce(
                  (currentSum, element) => {
                    if (
                      element.control.status === SCHEDULE_JOB_STATUS.WORKING
                    ) {
                      return currentSum + 1;
                    } else {
                      return currentSum;
                    }
                  },
                  0
                ),
                timeline: items.timeline,
              };

              delete itemObj.profileImage;
              if (items.shiftId != "") {
                itemObj = { ...itemObj, shiftId: items.shiftId };
              }
              return itemObj;
            });
          } else {
            formData = this.singleScheduleSave(singleFormEdit);
          }

          if (!formData || !formData.length) {
            return;
          }
          formData = formData.map((items) => {
            return { ...items, nullifyError };
          });
          console.log("waoaoaoa", formData);

          console.log("waooaoaaoa", formData);

          const response = await this.scheduleService.addScheule([...formData]);
          this.utilService.showAlert("Schedule sent successfully !");
          this.deleteImportId = false;
          this.nullifyError = false;
          this.deleteImportId = false;
          await this.resettIngSchedule();
        } else {
          throw { type: CUSTOM_HANDLE_ERROR.RETURN_STATE };
        }
      } else {
        //nullify errors while saving data

        formData = this.savedFormData.map((items) => {
          return { ...items, nullifyError };
        });

        const response = await this.scheduleService.addScheule([...formData]);
        this.utilService.showAlert("Schedule sent successfully !");
        this.deleteImportId = false;
        this.nullifyError = false;
        this.deleteImportId = false;

        await this.resettIngSchedule();
      }
    } catch (error) {
      console.error(error);

      if (error && error.type === CUSTOM_HANDLE_ERROR.RETURN_STATE) {
        this.reverseSaveAction(singleFormIndex);
        this.deleteImportId = false;
      }

      if (error && error instanceof HttpErrorResponse) {
        if (
          error.error.statusCode === CUSTOM_HANDLE_ERROR.CUSTOM_MESSAGE_ERROR
        ) {
          const saveScheduleConfig = {
            singleEdit,
            singleFormIndex,
            singleFormEdit,
            formData,
          };
          this.openWarningBeforeSave(error, saveScheduleConfig);
        }
      }
    }
  }

  reverseSaveAction(singleFormIndex) {
    const formArrayValue = {
      ...this.scheduleFormArray.at(singleFormIndex).value,
    };
    this.utilService.clearFormArray(
      this.scheduleFormArray.at(singleFormIndex).get("shiftData") as FormArray
    );
    const shiftData = formArrayValue.shiftData;
    for (let i = 0; i < shiftData.length; i++) {
      const shiftItemData = shiftData[i];
      const shiftDataFormGroup = this.scheduleService.createShiftDataForm();

      shiftDataFormGroup.patchValue({
        ...shiftItemData,
        // isDisabled:!(shiftItemData.control.status === SCHEDULE_JOB_STATUS.WORKING || shiftItemData.control.status === SCHEDULE_JOB_STATUS.REST)
        isDisabled: shiftItemData.isDisabled,
      });
      (
        this.scheduleFormArray.at(singleFormIndex).get("shiftData") as FormArray
      ).push(shiftDataFormGroup);
    }

    this.scheduleFormArray
      .at(singleFormIndex)
      .get("isImport")
      .setValue(formArrayValue.isImport);
    this.scheduleFormArray
      .at(singleFormIndex)
      .get("isEdit")
      .setValue(formArrayValue.isEdit);
    this.scheduleFormArray
      .at(singleFormIndex)
      .get("isSave")
      .setValue(formArrayValue.isSave);
  }

  openWarningBeforeSave(
    error,
    { singleFormEdit, singleEdit, singleFormIndex, formData }
  ) {
    const warningDialog = this.dialog.open(WarningPopupComponent, {
      width: "600px",
      data: error.error.data,
      disableClose: true,
      autoFocus: false,
    });

    warningDialog.afterClosed().subscribe((response) => {
      if (response && response === CUSTOM_HANDLE_ERROR.CONTINUE) {
        this.nullifyError = true;
        this.savedFormData = formData;
        this.saveSchedule(singleEdit, singleFormEdit, singleFormIndex, true);
      } else {
        this.reverseSaveAction(singleFormIndex);
      }
    });
  }

  async resettIngSchedule() {
    try {
      // this.utilService.clearFormArray(this.scheduleFormArray);
      const qqueryParams = this.utilService.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      );
      const response = await this.scheduleService
        .scheduleShiftListing(qqueryParams)
        .toPromise();
      if (response.data) {
        this.pageConfig = {
          total: response["data"]["total"],
          currentPage: response["data"]["page"],
          pageSize: 10,
          isNext: response["data"]["next"],
        };
        this.utilService.clearFormArray(this.scheduleFormArray);
        this.scheduleList = [];
        this.scheduleList = [...response["data"]["result"]];
        this.total = response["data"]["total"];
        this.assignScheduleData();
      }
    } catch (error) {
      this.utilService.showAlert("Error in fetching data ! Try reloading!");
    }
  }

  removeEditable(params) {
    let fullQueryParams = {};
    if (params["editable"]) {
      this.editable = params["editable"];
    } else {
      this.editable = 2;
    }
    for (let obj in params) {
      if (obj != "editable") {
        fullQueryParams[obj] = params[obj];
      }
    }
    return fullQueryParams;
  }

  // this function will check whether the schedule is editable or not
  checkDate(date): boolean {
    console.log(moment(date).isAfter(moment(), "day"));
    return !moment(date).isAfter(moment(), "day");
  }
}
