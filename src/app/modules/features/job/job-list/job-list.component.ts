import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import {
  JOB_PORTAL_TYPE,
  JOB_LIST_SORTING,
  LIST_PAGINATION,
  PAGE_KEY,
  LIMIT_KEY,
  PAGE_OPTION_LIMIT,
  SESSION_KEYS,
} from "src/app/constants/constant";
import { Pagination } from "src/app/constants/pagination";
import { JobManagementFilterComponent } from "src/app/modules/common/modules/job-management-filter/job-management-filter.component";
import { JobListService } from "./job-list.service";
import { UtilityService } from "src/app/services/utility.service";
import { FormUtils } from "src/app/constants/form.util";
import { PageConfig, Job_List } from "src/app/models/common.interface";
import { MatTableDataSource } from "@angular/material/table";
import * as Joi from "joi-browser";
import { JOB_LIST, JOB_ADD } from "src/app/constants/routes";
import { JOBS_LIST_STATUS, DIALOG_RESPONSE } from "src/app/constants/enums";
import { MatPaginator } from "@angular/material/paginator";
import { JobService } from "../add-job/service/job.service";
import { MatRadioChange } from "@angular/material/radio";
import { JOB_EMPTY_STATE_MESSAGE } from "src/app/constants/messages";

@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.scss"],
})
export class JobListComponent
  extends Pagination
  implements OnInit, OnDestroy, AfterViewInit
{
  jobStatus;
  isCopyNext: boolean = false;
  isCopyJob: boolean = false;
  jobCopyId: string = "";
  activeIndex = 0;
  searchList = new FormControl();
  searchSub: Subscription;
  jobMatMenu = JOB_LIST_SORTING;
  sorting = "Sort by";
  COMPLETED = 0;
  DRAFT = 0;
  ONGOING = 0;
  PUBLISHED = 0;
  filterObject: {
    page?: number;
    status?: number;
    limit?: number;
    sortOrder?;
    sortKey?;
  } = {
    page: 1,
    limit: 5,
  };
  searchSortFilter: FormGroup;
  filterSchema: any;
  sub: Subscription = new Subscription();
  pageConfig: PageConfig;
  dataSource = new MatTableDataSource<Job_List>([]);
  jobsList: any[] = [];
  firstTimeLoading = true;
  filterCount = 0;
  status: string;
  navLinks = [];
  currentQueryParams;
  JOB_EMPTY_STATE_MESSAGE=JOB_EMPTY_STATE_MESSAGE

  constructor(
    private jobListService: JobListService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utility: UtilityService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super();

    this.createSchema();
    this.createSearchSortFilter();
    this.sub.add(activatedRoute.queryParams.subscribe(params=>{
      this.status=params.status;
      this.currentQueryParams=params;

    
    this.searchSortFilter.patchValue(this.currentQueryParams);
    this.createNavLinks();
    this.listenQueryParamChanges();
    this.checkCopyJob(this.utility.isJobCopy.value);
      
    }))
    // this.status = this.activatedRoute.snapshot.params.status;
    // this.currentQueryParams = this.activatedRoute.snapshot.queryParams;
    
    
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  createNavLinks() {
    this.navLinks = [
      {
        link: `${JOB_LIST.fullUrl}/${JOBS_LIST_STATUS.MY_POSTING}`,
        label: `Hiring (${this.PUBLISHED})`,
        status: JOBS_LIST_STATUS.MY_POSTING,
      },
      {
        link: `${JOB_LIST.fullUrl}/${JOBS_LIST_STATUS.ONGOING}`,
        label: `Ongoing (${this.ONGOING})`,
        status: JOBS_LIST_STATUS.ONGOING,
      },

      {
        link: `${JOB_LIST.fullUrl}/${JOBS_LIST_STATUS.COMPLETED_JOBS}`,
        label: `Completed jobs (${this.COMPLETED})`,
        status: JOBS_LIST_STATUS.COMPLETED_JOBS,
      },
      {
        link: `${JOB_LIST.fullUrl}/${JOBS_LIST_STATUS.DRAFT}`,
        label: `Drafts (${this.DRAFT})`,
        status: JOBS_LIST_STATUS.DRAFT,
      },
    ];
  }

  async getJobCounts() {
    let {
      data: { COMPLETED, DRAFT, ONGOING, PUBLISHED },
    } = await this.jobListService.getJobCounts();
    this.COMPLETED = COMPLETED;
    this.DRAFT = DRAFT;
    this.ONGOING = ONGOING;
    this.PUBLISHED = PUBLISHED;
    this.createNavLinks();
  }
  /**
   * Creates search sort filter
   * @returns  filter
   */
  createSearchSortFilter() {
    return (this.searchSortFilter = this.formBuilder.group({
      search: [""],
      status: [""],
      jobArea: [""],
      jobRole: [""],
      minSalary: [""],
      maxSalary: [""],
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
      status: Joi.required(),
      jobArea: Joi.optional(),
      jobRole: Joi.optional(),
      minSalary: Joi.optional(),
      maxSalary: Joi.optional(),
      [PAGE_KEY]: Joi.number().min(1).required(),
      [LIMIT_KEY]: Joi.number(),
      sortKey: Joi.optional(),
      sortOrder: Joi.optional(),
    });
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
            this.pageConfig = {
              total: response["data"]["total"],
              currentPage: response["data"]["page"],
              pageSize: 10,
              isNext: response["data"]["next"],
            };
            this.sorting =
              this.searchSortFilter.value.sortKey != ""
                ? JOB_LIST_SORTING.find(
                    (list) =>
                      list.sortKey == this.searchSortFilter.value.sortKey
                  )
                  ? JOB_LIST_SORTING.find(
                      (list) =>
                        list.sortKey == this.searchSortFilter.value.sortKey
                    ).name
                  : "Sort By"
                : "Sort By";
            this.jobsList = [...response["data"]["result"]];
            this.total = response["data"]["total"];
            this.dataSource = new MatTableDataSource<Job_List>();
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
      queryParams: this.utility.formatData(
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
    this.filterObject = this.activatedRoute.snapshot.queryParams;
    if (!this.filterObject.status) {
      this.filterObject = {
        ...this.filterObject,
        status: JOBS_LIST_STATUS.MY_POSTING,
      };
    }

    // if (!this.firstTimeLoading) {
    //   return this.getjobsList();
    // }
    return new Observable((observer) => {
      try {
        Joi.validate(queryParams, this.filterSchema, (err, value: any) => {
          if (err) {
            throw err;
          } else {
            this.filterObject = { ...this.filterObject, ...value };
            this.searchSortFilter.patchValue(this.filterObject);
            this.firstTimeLoading = false;
            this.filterCount = Object.keys(this.filterObject).length - 3;
            if (this.filterObject.sortKey) {
              this.filterCount = this.filterCount - 2;
            }
            console.log(this.filterCount);

            this.getjobsList().subscribe(
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
        this.filterObject = { ...this.pageParams, ...this.filterObject };
        console.log(this.status,JOB_LIST.fullUrl)
        const path=JOB_LIST.fullUrl
        this.router.navigate(
          [
            `${JOB_LIST.fullUrl}/${JOBS_LIST_STATUS.MY_POSTING}`
          ],
          {
            queryParams: this.utility.formatData(
              FormUtils.parse({ ...this.filterObject })
            ),
          }
        );
      }
    });
  }

  /**
   * All query params
   * @returns  parsed params for safe
   */
  allQueryParams() {
    return this.utility.formatData(
      FormUtils.parse({
        ...this.pageParams,
        ...this.filterObject,
        // ...this.searchSortFilter.value,
      })
    );
  }

  /**
   * Gets Jobs list
   * @returns  listing of job according to queryparams
   */
  getjobsList() {
    this.getJobCounts();
    return this.jobListService.jobListing(this.allQueryParams());
  }

  /**
   * Routes handling
   * @param route checks route tyoe and sets booking listing data
   */
  routeHandling(route) {
    this.filterCount = 0;
    this.status = route.status;
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
    this.searchSortFilter.patchValue({
      ...this.filterObject,
      status: this.status,
    });

    this.router.navigate([route.link], {
      relativeTo: this.activatedRoute,
      queryParams: this.utility.formatData(
        FormUtils.parse({ ...this.filterObject, status: this.status })
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
      queryParams: this.utility.formatData(
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
      queryParams: this.utility.formatData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
      // queryParamsHandling: "merge",
    });
  }

  ngOnDestroy(): void {
    if (!this.isCopyNext) {
      this.utility.setJobCopy("");
      this.jobCopyId = "";
    }
    this.sub.unsubscribe();
    this.utility.clearSessionStorage(SESSION_KEYS.JOB_FILTER_JOB_AREA);
    this.utility.clearSessionStorage(SESSION_KEYS.JOB_ROLE_FILTER);
  }

  onFilterHandler() {
    const subscription = this.dialog
      .open(JobManagementFilterComponent, {
        width: "464px",
        panelClass: "custom_filter",
        height: "100vh",
        disableClose: true,
        autoFocus: false,
        data:
          this.filterObject && Object.keys(this.filterObject).length > 0
            ? { ...this.filterObject, status: this.status }
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
          this.filterCount = Object.keys(filterValue).length;
          this.searchSortFilter.reset();
          this.filterObject = {
            ...PAGE_OPTION_LIMIT(10),
            ...filterValue.data,
            fromDate,
            toDate,
          };
          this.searchSortFilter.patchValue({
            ...this.filterObject,
            ...filterValue.data,
            status: this.status,
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: FormUtils.parse({
              status: this.status,
              ...this.filterObject,
            }),
            // queryParamsHandling: 'merge',
          });
        } else {
          this.filterCount = 0;
          this.searchSortFilter.reset();
          this.filterObject = { ...PAGE_OPTION_LIMIT(10) };
          this.searchSortFilter.patchValue({
            ...this.filterObject,
            status: this.status,
            fromDate,
            toDate,
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: FormUtils.parse({
              // ...this.searchSortFilter.value,
              ...this.filterObject,
            }),
            // queryParamsHandling: 'merge',
          });
        }
      });
  }

  // onSetSearch(event) {
  //   event && this.getJobListing({ search: event, limit: 10 });
  // }

  /**
   * Check copy job is true or not
   * @returns  enable copy job feature if 'isCopyJob' is true
   */
  checkCopyJob(data) {
    if (data && data.isCopyJob) {
      this.isCopyJob = data.isCopyJob;
    } else {
      this.utility.setJobCopy("");
      this.jobCopyId = "";
    }
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
      await this.getJobCounts();
      const response = await this.jobListService
        .jobListing(qqueryParams)
        .toPromise();
      if (response.data) {
        this.pageConfig = {
          total: response["data"]["total"],
          currentPage: response["data"]["page"],
          pageSize: 10,
          isNext: response["data"]["next"],
        };
        this.jobsList = [];
        this.jobsList = [...response["data"]["result"]];
        this.total = response["data"]["total"];
      }
    } catch (error) {
      this.utility.showAlert("Error in fetching data ! Try reloading!");
    }
  }

  /**
   * Set job id for copyJob
   * @param  event provides job id
   */
  onSelectJob(event: MatRadioChange) {
    if (event.value) {
      this.jobCopyId = event.value;
    }
  }

  /**
   * Back to Add Job page with jobId
   */
  backToAddJob() {
    if (this.jobCopyId) {
      this.isCopyNext = true;
      this.utility.setJobCopy({
        jobCopyId: this.jobCopyId,
        isCopyJob: this.isCopyJob,
      });
      setTimeout(() => {
        this.router.navigate([JOB_ADD.fullUrl]);
      }, 0);
    }
  }

  /**
   * Cancel & back to Proier page (Add job page)
   */
  cancelToAddJOb() {
    this.utility.setJobCopy("");
    this.jobCopyId = "";
    this.router.navigate([JOB_ADD.fullUrl]);
  }

  copyJob(event: boolean = false) {
    this.isCopyNext = event;
  }
}
