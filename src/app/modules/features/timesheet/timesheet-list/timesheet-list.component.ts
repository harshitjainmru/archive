import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApprovePopupComponent } from "./approve-popup/approve-popup.component";
import { CandidatePopupComponent } from "./candidate-popup/candidate-popup.component";
import { TimesheetFilterComponent } from "./timesheet-filter/timesheet-filter.component";
import {
  DIALOG_RESPONSE,
  TIMESHEET_STATUS,
  SWITCH_CUSTOM_CHECKBOX,
  CUSTOM_DATE_FORMATS,
  TIMESHEET_TYPE,
  TIME_DIFFERENCE,
  SCHEDULE_JOB_STATUS,
} from "src/app/constants/enums";
import { FormUtils } from "src/app/constants/form.util";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { switchMap } from "rxjs/operators";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import {
  TIMESHEET_LIST_SORTING,
  PAGE_KEY,
  LIMIT_KEY,
  PAGE_OPTION_LIMIT,
  SESSION_KEYS,
} from "src/app/constants/constant";
import { Pagination } from "src/app/constants/pagination";
import {
  PageConfig,
  Timehseet_List,
  IDateRange,
  ICheckBox,
} from "src/app/models/common.interface";
import { TIMESHEET_LIST } from "src/app/constants/routes";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilityService } from "src/app/services/utility.service";
import { TimesheetService } from "../timesheet.service";
import * as Joi from "joi-browser";
import * as moment from "moment";
import { EditTimesheetComponent } from "./edit-timesheet/edit-timesheet.component";
import { MatCheckbox } from "@angular/material/checkbox";
import { IPopupData } from "src/app/models/popup";
import { POPUP_MESSAGES, TIMESHEET_EMPTY_STATES } from "src/app/constants/messages";
import { ConfirmationModalComponent } from "src/app/modules/common/components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "app-timesheet-list",
  templateUrl: "./timesheet-list.component.html",
  styleUrls: ["./timesheet-list.component.scss"],
})
export class TimesheetListComponent
  extends Pagination
  implements OnInit, OnDestroy
{
  timeSheetStatus = TIMESHEET_STATUS;
  activeIndex = 0;
  searchList = new FormControl();
  searchSub: Subscription;
  timeSheetMatMenu = TIMESHEET_LIST_SORTING;
  sorting = "Sort by";
  timeDifference = TIME_DIFFERENCE;
  TIMESHEET_EMPTY_STATES=TIMESHEET_EMPTY_STATES

  filterObject: {
    page?: number;
    type?: number;
    limit?: number;
  } = {
    page: 1,
    limit: 5,
  };
  searchSortFilter: FormGroup;
  filterSchema: any;
  sub: Subscription = new Subscription();
  pageConfig: PageConfig;
  dataSource = new MatTableDataSource<Timehseet_List>([]);
  timesheetList: any[] = [];
  firstTimeLoading = true;
  filterCount = 0;
  type: any;
  navLinks = [
    {
      link: `${TIMESHEET_LIST.fullUrl}/${TIMESHEET_STATUS.UNAPPROVED}`,
      label: "Unapproved timesheet",
      count: 0,
      type: TIMESHEET_STATUS.UNAPPROVED,
    },
    {
      link: `${TIMESHEET_LIST.fullUrl}/${TIMESHEET_STATUS.APPROVED}`,
      label: "Approved timesheet",
      count: 0,
      type: TIMESHEET_STATUS.APPROVED,
    },
    {
      link: `${TIMESHEET_LIST.fullUrl}/${TIMESHEET_STATUS.REJECTED}`,
      label: "Rejected timesheet",
      count: 0,
      type: TIMESHEET_STATUS.REJECTED,
    },
    {
      link: `${TIMESHEET_LIST.fullUrl}/${TIMESHEET_STATUS.LEAVE}`,
      label: "Pending/Leaves",
      count: 0,
      type: TIMESHEET_STATUS.LEAVE,
    },
  ];
  currentQueryParams;
  timeSheetType = TIMESHEET_TYPE.NONEVENT;
  userDetailTimesheet;

  displayedColumns: string[] = [
    "userData",
    "jobData",
    "shiftDate",
    "clockIn",
    "clockOut",
    "totalShiftHours",
    "action",
  ];

  jobStatus = SCHEDULE_JOB_STATUS;

  dateRangeConfig: IDateRange;
  checkboxSelectionConfig: ICheckBox;

  @ViewChildren("singleSelectionCheckboxRef")
  singleSelectionCheckboxRef: QueryList<any>;
  @ViewChild("selectCheckElemref") selectCheckElemref: MatCheckbox;
  customDateformat = CUSTOM_DATE_FORMATS;

  routeSbscription:Subscription=new Subscription();
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utility: UtilityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private timesheetService: TimesheetService
  ) {
    super();

    this.createSchema();
    this.createSearchSortFilter();
    // this.type = this.activatedRoute.snapshot.queryParams.type;
    this.routeSbscription.add(activatedRoute.queryParams.subscribe((params)=>{
      this.type=params?.type;
      this.currentQueryParams=params;
      this.timeSheetType = this.currentQueryParams.timeSheetType;
      this.searchSortFilter.patchValue(this.currentQueryParams);
      this.listenQueryParamChanges();
      console.log(params)
    }))

    
  }

  ngOnInit(): void {
    this.checkboxSelectionConfig = {
      list: [],
      viewKey: "label",
      valueKey: "_id",
      selectedList: [],
      type: SWITCH_CUSTOM_CHECKBOX.TIMESHEET_SELECTION,
      control: new FormControl(""),
      label: "timesheet",
    };
  }

  /**
   * Creates search sort filter
   * @returns  filter
   */
  createSearchSortFilter() {
    return (this.searchSortFilter = this.formBuilder.group({
      search: [""],
      type: [""],
      jobRole: [""],
      maxSalary: [""],
      [PAGE_KEY]: [""],
      [LIMIT_KEY]: [""],
      sortKey: [""],
      sortOrder: [""],
      fromDate: [""],
      toDate: [""],
      employeeId: [""],
      attendanceStatus: [""],
      jobIds: [""],
    }));
  }

  /**
   * Creates schema for url
   */
  createSchema() {
    this.filterSchema = Joi.object({
      search: Joi.optional(),
      type: Joi.required(),
      jobRole: Joi.optional(),
      [PAGE_KEY]: Joi.number().min(1).required(),
      [LIMIT_KEY]: Joi.number(),
      sortKey: Joi.optional(),
      sortOrder: Joi.optional(),
      fromDate: Joi.required(),
      toDate: Joi.required(),
      employeeId: Joi.optional(),
      attendanceStatus: Joi.optional(),
      jobIds: Joi.optional(),
    });
  }

  /**
   * Listens query param changes
   */
  listenQueryParamChanges() {
    this.sub.add(
      this.activatedRoute.queryParams
        .pipe(switchMap((data) => this.validateFilters({ ...data })))
        .subscribe(async (response) => {
          if (response) {
            // response = TIME_SHEET_DATA;
            this.pageConfig = {
              total: response["data"]["workerShiftListing"]["total"],
              currentPage: response["data"]["workerShiftListing"]["page"],
              pageSize: 10,
              isNext: response["data"]["workerShiftListing"]["next"],
            };
            this.sorting =
              this.searchSortFilter.value.sortKey != ""
                ? TIMESHEET_LIST_SORTING.find(
                    (list) =>
                      list.sortKey == this.searchSortFilter.value.sortKey
                  )
                  ? TIMESHEET_LIST_SORTING.find(
                      (list) =>
                        list.sortKey == this.searchSortFilter.value.sortKey
                    ).name
                  : "Sort By"
                : "Sort By";
            this.timesheetList = [
              ...response["data"]["workerShiftListing"]["result"],
            ];

            this.total = response["data"]["workerShiftListing"]["total"];
            this.dataSource = new MatTableDataSource<Timehseet_List>(
              this.timesheetList
            );
            // this.dataSource.paginator =response["data"]['workerShiftListing']["page"];

            if (
              this.searchSortFilter.get("employeeId").value &&
              this.searchSortFilter.get("employeeId").value != ""
            ) {
              const body = {
                applyId: this.utility.getSessionStorage(
                  SESSION_KEYS.APPLYJOBID
                ),
                applicantId: this.searchSortFilter.get("employeeId").value,
              };
              const applicantDetail =
                await this.timesheetService.applicationDetails(body);
              if (applicantDetail.data) {
                this.userDetailTimesheet = applicantDetail.data[0];
              }
            }

            this.checkboxSelectionConfig = {
              ...this.checkboxSelectionConfig,
              list: this.timesheetList.map((items) => {
                return {
                  _id: items.shift._id,
                  label: items.jobId,
                  itemData: { ...items },
                };
              }),
            };
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
      queryParams: this.utility.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
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
    this.filterObject = this.currentQueryParams;
    if (!this.filterObject.type) {
      
      this.filterObject = {
        ...this.filterObject,
        type: TIMESHEET_STATUS.UNAPPROVED,
      };
    }

    // if (!this.firstTimeLoading) {
    //   console.log("-----");
    //   Joi.validate(queryParams)
    //   return this.gettimesheetList();
    // }
    return new Observable((observer) => {
      try {
        Joi.validate(queryParams, this.filterSchema, (err, value: any) => {
          if (err) {
            throw err;
          } else {
            this.filterObject = { ...this.filterObject, ...value };
            this.dateRangeConfig = {
              startDate: this.searchSortFilter.get("fromDate") as FormControl,
              endDate: this.searchSortFilter.get("toDate") as FormControl,
              iSaveAllowed: new FormControl(true),
              maxDateRange: moment().toDate(),
            };
            this.searchSortFilter.patchValue(this.filterObject);
            this.firstTimeLoading = false;
            this.filterCount = Object.keys(this.filterObject).length - 1;
            this.gettimesheetList().subscribe(
              (response) => {
                this.firstTimeLoading = false;
                observer.next(response);
                observer.complete();
              },
              (error) => {
                this.firstTimeLoading = false;
                observer.error(error);
                observer.complete();
              }
            );
          }
        });
      } catch (error) {
        console.error("error", error);
        this.filterObject = {
          ...this.pageParams,
          ...this.filterObject,
          ...this.utility.getStartAndToday(),
        };
        const type = this.type ? this.type : TIMESHEET_STATUS.UNAPPROVED;

        this.router.navigate([`${TIMESHEET_LIST.fullUrl}/${type}`], {
          queryParams: this.utility.formatMomentData(
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
  allQueryParams() {
    return this.utility.formatMomentData(
      FormUtils.parse({
        ...this.pageParams,
        ...this.filterObject,
        // ...this.searchSortFilter.value,
        fromDate: this.dateRangeConfig.startDate.value,
        toDate: this.dateRangeConfig.endDate.value,
      })
    );
  }

  /**
   * Gets Jobs list
   * @returns  listing of job according to queryparams
   */
  gettimesheetList() {
    return this.timesheetService.timeSheetListing(this.allQueryParams());
  }

  /**
   * Routes handling
   * @param route checks route tyoe and sets booking listing data
   */
  routeHandling(route) {
    this.filterCount = 0;
    // this.currentRouteLink = route.link;
    this.type = route.type;
    this.filterObject = PAGE_OPTION_LIMIT(10);
    this.pageOptionsOnChange = {
      pageIndex: 0,
      pageSize: this.filterObject.limit,
    };

    this.filterObject = {
      ...this.filterObject,
      ...this.searchSortFilter.value,
      ...PAGE_OPTION_LIMIT(10),
    };

    const { startDate, endDate } = this.dateRangeConfig;

    this.searchSortFilter.patchValue({
      ...this.filterObject,
      type: this.type,
      fromDate: startDate.value,
      toDate: endDate.value,
    });

    this.router.navigate([route.link], {
      relativeTo: this.activatedRoute,
      queryParams: this.utility.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
    });
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
    this.searchSortFilter.patchValue({ ...this.filterObject });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utility.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
      queryParamsHandling: "merge",
    });
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
      queryParams: this.utility.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
    });
    // this.filterObject = {...this.filterObject, ...PAGE_OPTION_LIMIT(5), sortKey, sortOrder};
    // this.gettimesheetList()
    // this.gettimesheetList({ sortKey, sortOrder, limit: 10 });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.routeSbscription.unsubscribe();
  }

  listenFormValueChanges(event) {
    const { startDate, endDate } = this.dateRangeConfig;
    // this.searchSortFilter.patchValue({...this.searchSortFilter.value, fromDate:startDate.value,toDate:endDate.value})
    const filterParams = {
      ...this.filterObject,
      ...this.searchSortFilter.value,
      fromDate: startDate.value,
      toDate: endDate.value,
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utility.formatMomentData(
        FormUtils.parse({
          ...filterParams,
        })
      ),
      queryParamsHandling: "merge",
    });
  }

  onFilterHandler() {
    const subscription = this.dialog
      .open(TimesheetFilterComponent, {
        width: "464px",
        panelClass: "custom_filter",
        height: "100vh",
        disableClose: true,
        autoFocus: false,
        data:
          this.filterObject && Object.keys(this.filterObject).length > 0
            ? { ...this.filterObject, type: this.type }
            : {},
      })
      .afterClosed()
      .subscribe((filterValue = {}) => {
        if (filterValue.type === DIALOG_RESPONSE.DISMISS) {
          return;
        }
        const searchfilterValue = { ...this.searchSortFilter.value };
        const { fromDate, toDate } = searchfilterValue;

        if (filterValue && filterValue.type === DIALOG_RESPONSE.APPLY) {
          this.filterCount = Object.keys(filterValue).length;
          // this.searchSortFilter.reset();
          this.filterObject = {
            ...PAGE_OPTION_LIMIT(10),
            ...filterValue.data,
            fromDate,
            toDate,
          };
          this.searchSortFilter.patchValue({
            ...filterValue.data,
            type: this.type,
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: FormUtils.parse(
              this.utility.formatMomentData({
                type: this.type,
                ...this.filterObject,
              })
            ),
          });
        } else {
          this.filterCount = 0;
          this.searchSortFilter.reset();
          this.filterObject = { ...PAGE_OPTION_LIMIT(10), type: this.type };
          this.searchSortFilter.patchValue({
            ...this.filterObject,
            type: this.type,
            fromDate,
            toDate,
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: FormUtils.parse(
              this.utility.formatMomentData({
                // type: this.type,
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

  async singleSelectionUpdatesheet(itemData, type: TIMESHEET_STATUS) {
    try {
      let data: IPopupData = {
        title: POPUP_MESSAGES.confrim,
        message: POPUP_MESSAGES.timesheetStatusConfirm,
        cancelButtonText: POPUP_MESSAGES.cancel,
        hideConfirmButton: true,
      };

      const resp = await this.utility.openDialog(data).toPromise();
      if (resp) {
        const body = {
          type,
          shiftIds: itemData.shift._id,
        };
        const response = await this.timesheetService
          .bulkSelectionTimesheet({ ...body })
          .toPromise();
        if (response.data) {
          this.fetchUpdatedList();
        }
      }
    } catch (error) {}
  }

  editTimeSheet(itemData) {
    const dialogRef = this.dialog.open(EditTimesheetComponent, {
      data: {
        controls: {
          startTime: new FormControl(
            itemData.shift.clockIn
              ? new Date(itemData.shift.clockIn)
              : moment(itemData.shift.shiftDate).startOf("day").toDate()
          ),
          endTime: new FormControl(new Date(itemData.shift.clockOut)),
        },
        shiftId: itemData.shift._id,
        itemData,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response === DIALOG_RESPONSE.APPLY) {
        this.fetchUpdatedList();
        const { fromDate, toDate, employeeId } = this.searchSortFilter.value;
        this.timesheetService.updateAttendanceStatus(
          this.utility.formatMomentData({ fromDate, toDate, employeeId })
        );
      }
    });
  }

  loadMoreList(event) {}

  openStaffDetail(itemData) {
    const staffdetailRef = this.dialog.open(CandidatePopupComponent, {
      data: {
        itemData,
        fromDate: this.dateRangeConfig.startDate.value,
        toDate: this.dateRangeConfig.endDate.value,
      },
    });
    staffdetailRef.afterClosed().subscribe((resp) => {
      if (resp === DIALOG_RESPONSE.APPLY) {
        this.searchSortFilter.patchValue({
          ...this.searchSortFilter.value,
          employeeId: itemData.jobData[0].userData._id,
        });

        this.utility.setSessionStorage(
          SESSION_KEYS.APPLYJOBID,
          JSON.stringify(itemData.applyJobId)
        );

        this.userDetailTimesheet = itemData.jobData[0].userData;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: this.utility.formatMomentData(
            FormUtils.parse({
              ...this.filterObject,
              ...this.searchSortFilter.value,
            })
          ),
        });
      }
    });
  }

  clearUserFilter() {
    this.searchSortFilter.patchValue({
      ...this.searchSortFilter.value,
      employeeId: "",
    });
    this.utility.clearSessionStorage(SESSION_KEYS.APPLYJOBID);

    this.userDetailTimesheet = undefined;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.utility.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
    });
  }

  onCheckboxChange() {
    setTimeout(() => {
      const data = this.singleSelectionCheckboxRef
        .toArray()
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => {
          return {
            listIds: checkbox.value._id,
            listdata: checkbox.value,
          };
        });
      this.checkboxSelectionConfig.control.setValue(
        data.length ? data.map((list) => list.listIds) : null
      );
      this.checkboxSelectionConfig.selectedList = [
        ...data.map((list) => list.listdata),
      ];
    });
  }

  bulkSelection(type: TIMESHEET_STATUS) {
    if (!this.checkboxSelectionConfig.control.value.length) {
      this.utility.showAlert("Please select first to perform any action !");
      return;
    }
    const dialogRef = this.dialog.open(ApprovePopupComponent, {
      data: {
        type,
        timesheetList: this.checkboxSelectionConfig.selectedList,
        checkboxConfig: this.checkboxSelectionConfig,
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response === DIALOG_RESPONSE.APPLY) {
        this.fetchUpdatedList();
      }
    });
  }

  async fetchUpdatedList() {
    try {
      // this.utilService.clearFormArray(this.scheduleFormArray);
      const qqueryParams = this.utility.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      );
      const response = await this.timesheetService
        .timeSheetListing(qqueryParams)
        .toPromise();
      if (response.data) {
        this.pageConfig = {
          total: response["data"]["workerShiftListing"]["total"],
          currentPage: response["data"]["workerShiftListing"]["page"],
          pageSize: 10,
          isNext: response["data"]["workerShiftListing"]["next"],
        };
        this.sorting =
          this.searchSortFilter.value.sortKey != ""
            ? TIMESHEET_LIST_SORTING.find(
                (list) => list.sortKey == this.searchSortFilter.value.sortKey
              ).name
            : "Sort By";
        this.timesheetList = [
          ...response["data"]["workerShiftListing"]["result"],
        ];

        this.total = response["data"]["workerShiftListing"]["total"];
        this.dataSource = new MatTableDataSource<Timehseet_List>(
          this.timesheetList
        );

        this.selectCheckElemref.checked = false;
        this.checkboxSelectionConfig = {
          ...this.checkboxSelectionConfig,
          list: this.timesheetList.map((items) => {
            return {
              _id: items.shift._id,
              label: items.jobId,
              itemData: { ...items },
            };
          }),
        };
        this.checkboxSelectionConfig.control.setValue("");
      }
    } catch (error) {
      this.utility.showAlert("Error in fetching data ! Try reloading!");
    }
  }

  async downloadTimesheet() {
    const temp = {
      ...this.utility.formatMomentData(
        FormUtils.parse({
          ...this.filterObject,
        })
      ),
    };
    const query = {
      fromDate: temp.fromDate,
      toDate: temp.toDate,
    };

    const res: any = await this.timesheetService.downloadTimesheet(query);
    console.log(res);

    try {
      const jsonRes = JSON.parse(res);
      // this.utility.showAlert(jsonRes.message);
      this.utility.showAlert("No data available for the selected dates.");
    } catch (error) {
      var a = document.createElement("a");
      a.setAttribute("style", "display:none;");
      document.body.appendChild(a);
      var blob = new Blob([res], { type: "text/csv" });
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "timesheet.csv";
      a.click();
    }

    // console.log(res);
  }
}
