import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import {
  PAGE_KEY,
  LIMIT_KEY,
  PAGE_OPTION_LIMIT,
  APPLICANT_LIST_SORTING,
  SESSION_KEYS,
  JOB_PORTAL_TYPE,
} from "src/app/constants/constant";
import {
  APPLY_TYPE,
  CANDIDATE_STATUS,
  CONFIRM_MODAL_TYPE,
  DIALOG_RESPONSE,
  JOB_CANCEL_PAUSE,
} from "src/app/constants/enums";
import { Pagination } from "src/app/constants/pagination";
import {
  APPLICANT,
  APPLICANT_DETAILS,
  APPLICANT_LIST,
  JOB_ADD,
} from "src/app/constants/routes";
import { PageConfig } from "src/app/models/common.interface";
import { UtilityService } from "src/app/services/utility.service";
import { ApplicantService } from "../applicant.service";
import { ApplicantFilterComponent } from "./applicant-filter/applicant-filter.component";
import { CreateContractPopupComponent } from "./create-contract-popup/create-contract-popup.component";
import { CreateContractPopupComponent as CreateContractPopupFromInvite } from "../../search-applicant/create-contract-popup/create-contract-popup.component";
import * as Joi from "joi-browser";
import { switchMap } from "rxjs/operators";
import { FormUtils } from "src/app/constants/form.util";
import { MatPaginator } from "@angular/material/paginator";
import { IPopupData } from "src/app/models/popup";
import { TranslateService } from "src/app/services/translate.service";
import { JobListService } from "../../job-list/job-list.service";
import { APPLICANT_EMPTY_STATES } from "src/app/constants/messages";

@Component({
  selector: "app-applicant-list",
  templateUrl: "./applicant-list.component.html",
  styleUrls: ["./applicant-list.component.scss"],
})
export class ApplicantListComponent
  extends Pagination
  implements OnInit, OnDestroy
{
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
    this.utility.clearSessionStorage(SESSION_KEYS.APPLICANT_FILTER_SKILLS);
    if (this.activatedSub) {
      this.activatedSub.unsubscribe();
    }
  }

  filterObject: {
    page?: number;
    status?: CANDIDATE_STATUS;
    limit?: number;
    jobId?: string;
    sortOrder?;
    sortKey?;
  } = {
    page: 1,
    limit: 5,
  };
  searchSortFilter: FormGroup;
  jobStatus = JOB_PORTAL_TYPE;
  pauseCanelEnum = JOB_CANCEL_PAUSE;
  filterSchema: any;
  sub: Subscription = new Subscription();
  pageConfig: PageConfig;
  dataSource = new MatTableDataSource<any>([]);
  applicantList: any[] = [];
  firstTimeLoading = true;
  filterCount = 0;
  status: CANDIDATE_STATUS;
  jobId: string = null;
  currentQueryParams;
  selectionType: "None" | "Select All" | "Select Individually" = "None";
  showCheckbox: boolean = false;
  jobDetails;
  jobMatMenu = APPLICANT_LIST_SORTING;
  sorting = "Sort by";
  selectedIds: Array<string> = [];
  navLinks = [];
  candidateStatus = CANDIDATE_STATUS;
  sortBy: string = "";
  vacancies: number = 0;
  //counts for UI
  appliedCount: number = 0;
  totalSendContract = 0;
  unprocessedCount: number = 0;
  shortlistedCount: number = 0;
  hiredCount: number = 0;
  notSuitableCount: number = 0;
  invitedCount: number = 0;
  totalVisitedCount: number = 0;
  activatedSub: Subscription;
  APPLICANT_EMPTY_STATES=APPLICANT_EMPTY_STATES


  constructor(
    private dialog: MatDialog,
    private applicantService: ApplicantService,
    private activatedRoute: ActivatedRoute,
    private utility: UtilityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private jobListService: JobListService
  ) {
    super();
    this.createSchema();
    this.createSearchSortFilter();
    this.status = this.activatedRoute.snapshot.params.status;
    this.jobId = this.activatedRoute.snapshot.params.jobId;
    this.activatedSub = this.activatedRoute.params.subscribe(
      ({ status, jobId }) => {
        if (status && jobId) {
          this.status = status;
          this.jobId = jobId;
          console.log({ status, jobId });

          this.getJobDetails();
        }
      }
    );
    this.createNavLinks();
    this.currentQueryParams = this.activatedRoute.snapshot.queryParams;
    this.searchSortFilter.patchValue(this.currentQueryParams);
    this.listenQueryParamChanges();
    this.selectMenu({
      name: "Newest first",
      sortKey: "createdAt",
      sortOrder: 1,
    });
    // this.checkCopyJob(this.utility.isJobCopy.value);
  }
  ngOnInit(): void {}

  async getJobDetails() {
    try {
      const { data } = await this.applicantService.getJobDetails(this.jobId);
      this.jobDetails = data;
      this.vacancies = data.vacancies;
      this.updateCount(data);

      this.invitedCount = data.totalInvitationCount;
      console.log(data);
    } catch (error) {
      console.log("error in fething job details");
    }
  }

  createNavLinks() {
    this.navLinks = [
      {
        link: `${APPLICANT_LIST.fullUrl(this.jobId)}/${
          CANDIDATE_STATUS.APPLIED
        }`,
        label: `Unprocessed applications (${this.unprocessedCount})`,
        // label: `Unprocessed applications`,
        status: CANDIDATE_STATUS.APPLIED,
      },

      {
        link: `${APPLICANT_LIST.fullUrl(this.jobId)}/${
          CANDIDATE_STATUS.SHORTLISTED
        }`,
        label: `Shortlisted (${this.shortlistedCount})`,
        // label: `Shortlisted`,
        status: CANDIDATE_STATUS.SHORTLISTED,
      },
      {
        link: `${APPLICANT_LIST.fullUrl(this.jobId)}/${
          CANDIDATE_STATUS.CONTRACT_SEND
        }`,
        label: `Job offers (${this.totalSendContract})`,
        // label: `Job offers`,
        status: CANDIDATE_STATUS.CONTRACT_SEND,
      },
      {
        link: `${APPLICANT_LIST.fullUrl(this.jobId)}/${
          CANDIDATE_STATUS.CONTRACT_SIGNED
        }`,
        label: `Hired (${this.hiredCount})`,
        // label: `Hired`,
        status: CANDIDATE_STATUS.CONTRACT_SIGNED,
      },

      {
        link: `${APPLICANT_LIST.fullUrl(this.jobId)}/${
          CANDIDATE_STATUS.NOT_SUITABLE
        }`,
        label: `Not suitable (${this.notSuitableCount})`,
        // label: `Not suitable`,
        status: CANDIDATE_STATUS.NOT_SUITABLE,
      },
      {
        link: `${APPLICANT_LIST.fullUrl(this.jobId)}/${
          CANDIDATE_STATUS.INVITATION
        }`,
        label: `Invitations (${this.invitedCount})`,
        // label: `Invitations`,
        status: CANDIDATE_STATUS.INVITATION,
      },
    ];
  }
  /**
   * Creates search sort filter
   * @returns  filter
   */
  createSearchSortFilter() {
    return (this.searchSortFilter = this.formBuilder.group({
      search: [""],
      status: [""],
      jobId: [""],
      skills: [""],
      rating: [""],
      appliedOn: [""],
      experience: [""],
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
      status: Joi.optional(),
      jobId: Joi.required(),
      skills: Joi.optional(),
      rating: Joi.optional(),
      appliedOn: Joi.optional(),
      experience: Joi.optional(),
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
                ? APPLICANT_LIST_SORTING.find(
                    (list) =>
                      list.sortKey == this.searchSortFilter.value.sortKey
                  )
                  ? APPLICANT_LIST_SORTING.find(
                      (list) =>
                        list.sortKey == this.searchSortFilter.value.sortKey
                    ).name
                  : "Sort by"
                : "Sort by";
            this.applicantList = [...response["data"]["result"]];
            this.total = response["data"]["total"] || 0;
            this.dataSource = new MatTableDataSource<any>();
          }
        })
    );
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
        status: CANDIDATE_STATUS.APPLIED,
        jobId: this.jobId,
      };
    }
    if (!this.filterObject.jobId) {
      this.filterObject = {
        ...this.filterObject,
        status: this.status,
        jobId: this.jobId,
      };
    }

    if (!this.firstTimeLoading) {
      return this.getApplicantList();
    }
    console.log(this.filterObject);

    return new Observable((observer) => {
      try {
        Joi.validate(queryParams, this.filterSchema, (err, value: any) => {
          if (err) {
            throw err;
          } else {
            this.filterObject = { ...this.filterObject, ...value };
            this.searchSortFilter.patchValue(this.filterObject);
            this.firstTimeLoading = false;
            this.filterCount = Object.keys(this.filterObject).length - 4;
            if (this.filterObject.sortKey) {
              this.filterCount = this.filterCount - 2;
            }
            this.getApplicantList().subscribe(
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
        console.log("error", error);
        this.filterObject = { ...this.pageParams, ...this.filterObject };
        this.status = this.status ?? CANDIDATE_STATUS.APPLIED;
        // console.log(this.status);

        // console.log(APPLICANT.fullUrl("123") + "/");

        this.router.navigate(
          [
            APPLICANT_LIST.fullUrl(this.jobId) + "/" + this.status ??
              CANDIDATE_STATUS.APPLIED,
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
        ...this.filterObject,
        ...this.pageParams,
        jobId: this.jobId,
        status: this.status,
      })
    );
  }

  /**
   * Gets Applicant list
   * @returns  listing of job according to queryparams
   */
  getApplicantList() {
    return this.applicantService.getApplicantList(this.allQueryParams());
  }

  openFilter() {
    this.dialog.open(ApplicantFilterComponent, {
      width: "400px",
      panelClass: "custom_filter",
      height: "100vh",
      disableClose: false,
      autoFocus: false,
      data:
        this.filterObject && Object.keys(this.filterObject).length > 0
          ? { ...this.filterObject, status: this.status }
          : {},
    });
  }

  /**
   * Routes handling
   * @param route checks route tyoe and sets booking listing data
   */
  routeHandling(route) {
    this.selectionType = "None";
    this.showCheckbox = false;
    this.selectedIds = [];
    this.filterCount = 0;
    this.sortBy = "None";
    console.log(this.sortBy);

    // this.currentRouteLink = route.link;
    this.status = route.status;
    this.filterObject = PAGE_OPTION_LIMIT(10);
    this.searchSortFilter.patchValue({
      ...this.filterObject,
      status: this.status,
      jobId: this.jobId,
      sortOrder: null,
      sortKey: null,
    });
    this.filterObject = {
      ...this.filterObject,
      ...this.searchSortFilter.value,
      ...PAGE_OPTION_LIMIT(10),
      sortOrder: null,
      sortKey: null,
    };

    console.log(this.filterObject);

    this.router.navigate([route.link], {
      relativeTo: this.activatedRoute,
      queryParams: this.utility.formatData(
        FormUtils.parse({
          ...this.filterObject,
          status: this.status,
          jobId: this.jobId,
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
      queryParams: this.utility.formatData(
        FormUtils.parse({
          ...this.filterObject,
          ...this.searchSortFilter.value,
        })
      ),
      queryParamsHandling: "merge",
    });
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
  onFilterHandler() {
    console.log(this.status);
    
    const subscription = this.dialog
      .open(ApplicantFilterComponent, {
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
        if (filterValue.type === DIALOG_RESPONSE.DISMISS) {
          return;
        }
        if (filterValue && filterValue.type === DIALOG_RESPONSE.APPLY) {
          this.filterCount = Object.keys(filterValue.data).length;

          this.searchSortFilter.reset();
          this.filterObject = {
            ...PAGE_OPTION_LIMIT(10),
            ...filterValue.data,
            jobId: this.jobId,
            status: this.status,
          };
          this.searchSortFilter.patchValue({
            ...filterValue.data,
            status: this.status,
            jobId: this.jobId,
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: FormUtils.parse({
              status: this.status,
              ...this.filterObject,
              jobId: this.jobId,
            }),
            // queryParamsHandling: 'merge',
          });
        } else {
          this.filterCount = 0;
          this.filterObject = {
            ...PAGE_OPTION_LIMIT(10),
            jobId: this.jobId,
            status: this.status,
          };
          console.log(this.filterObject);

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

  refreshList(refresh: boolean) {
    if (refresh) {
      this.validateFilters(this.allPrams()).subscribe((response) => {
        if (response) {
          this.pageConfig = {
            total: response["data"]["total"],
            currentPage: response["data"]["page"],
            pageSize: 10,
            isNext: response["data"]["next"],
          };
          this.applicantList = [...response["data"]["result"]];
          this.total = response["data"]["total"] || 0;
          this.dataSource = new MatTableDataSource<any>();
        }
      });
    }
  }

  changeSelectionType(type, showCheckbox) {
    this.showCheckbox = showCheckbox;
    this.selectionType = type;

    if (this.selectionType === "Select All") {
      this.selectedIds = [];
      this.applicantList.forEach((applicant) =>
        this.selectedIds.push(applicant._id)
      );
      return;
    }
    this.selectedIds = [];
  }

  handleAddRemove(checked, id) {
    checked ? this.selectedIds.push(id) : this.removeId(id);
    console.log(this.selectedIds);
    if (this.selectedIds.length == this.applicantList.length) {
      this.selectionType = "Select All";
    }
  }

  removeId(id) {
    const idx = this.selectedIds.indexOf(id);
    this.selectedIds.splice(idx, 1);
    this.selectionType = "Select Individually";
    console.log(this.selectedIds);
  }

  async changeStatusBulk(status: CANDIDATE_STATUS) {
    const res = await this.applicantService.changeStatus(
      [...this.selectedIds],
      status,
      this.status,
      this.jobId
    );
    console.log(res);
    this.showCheckbox = false;
    this.selectedIds = [];
    this.selectionType = "None";
    this.refreshList(true);
    this.appliedCount = res.data.totalAppliedCount;
    this.unprocessedCount = res.data.totalUnprocessedCount;
    this.shortlistedCount = res.data.totalShortlistedCount;
    this.hiredCount = res.data.totalSignedContract;
    this.notSuitableCount = res.data.totalNotSuitableCount;
    this.totalSendContract = this.totalSendContract;
    console.log(this.notSuitableCount);
    this.createNavLinks();
  }

  openJobOfferPopup({applicant,previousState}) {
    console.log(applicant);

    const dialog = this.dialog.open(CreateContractPopupComponent, {
      width: "694px",
      panelClass: "custom_contract",
      // height: "100vh",
      data: { applicant, jobDetails: this.jobDetails,previousState:previousState },
      disableClose: false,
      autoFocus: false,
    });
    dialog.afterClosed().subscribe((refreshList) => {
      if (refreshList) {
        this.refreshList(refreshList);
        this.getJobDetails();
      }
    });
  }
  async changeStatus({ ids, status, previousState, jobId }) {
    console.log(ids, status, previousState, jobId);

    // if (status == CANDIDATE_STATUS.HIRED && this.hiredCount >= this.vacancies) {
    //   this.utility.dialogAlert("All vacancies have been filled.");
    //   return;
    // }

    const res = await this.applicantService.changeStatus(
      ids,
      status,
      previousState,
      jobId
    );

    this.refreshList(true);
    this.updateCount(res.data);
  }

  updateCount(data: any) {
    this.appliedCount = data.totalAppliedCount;
    this.unprocessedCount = data.totalUnprocessedCount;
    this.shortlistedCount = data.totalShortlistedCount;
    this.hiredCount = data.totalSignedContract;
    this.notSuitableCount = data.totalNotSuitableCount;
    console.log(this.notSuitableCount);
    this.totalVisitedCount = data.totalVisitedCount;
    this.invitedCount = data.totalInvitationCount;
    this.totalSendContract = data.totalSendContract;
    this.createNavLinks();
  }

  routeToDetails({ applicantId, applyId }) {
    this.applicantService.applicantList = [...this.applicantList];
    this.router.navigate([APPLICANT_DETAILS.fullUrl(this.jobId)], {
      queryParams: { applicantId, applyId },
    });
  }

  goTojobDetail() {
    this.router.navigate([`job/details/${this.jobId}`]);
  }

  copyJob() {
    console.log("came");

    let data: IPopupData = {
      message: "Are you sure you want to copy this job?",
      hideConfirmButton: true,
      cancelButtonText: "Close",
      confirmButtonText: "Yes",
    };
    this.utility.openDialog(data).subscribe((resp) => {
      if (resp) {
        // this.copyJobEvent.emit(true);
        this.utility.setJobCopy({
          jobCopyId: this.jobDetails._id,
          isCopyJob: true,
        });
        setTimeout(() => {
          this.router.navigate([JOB_ADD.fullUrl]);
        }, 0);
      }
    });
  }

  updateCancelPause(jobId, type) {
    let data: IPopupData = {
      message: TranslateService.data.ARE_YOU_SURE,
      showTextBox: true,
      textBoxType: CONFIRM_MODAL_TYPE.PARAGRAPH,
      textBoxpara:
        this.pauseCanelEnum.CANCEL === type
          ? TranslateService.data.CANCEL_CONFIRM
          : TranslateService.data.PAUSE_CONFIRM,
      hideConfirmButton: true,
      cancelButtonText: "Close",
      confirmButtonText: "Yes",
    };
    try {
      this.utility.openDialog(data).subscribe(async (resp) => {
        if (resp) {
          const body = {
            jobId,
            type,
          };
          const resp = await this.jobListService.updateCancelPauseJob(body);
          if (resp.data) {
            this.utility.showAlert("Status updated successfully !");
            // this.deletJobEvent.emit(true);
            this.getJobDetails();
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async withdrawContract(payload) {
    console.log(payload);

    const res = await this.applicantService.updateContractStatus(payload);
    this.refreshList(true);
    this.getJobDetails();
  }

  async makeOfferFromInvitaion({applicant,previousState}) {
    try {

      const userIdArray = applicant ? [applicant._id] : [...this.selectedIds];
      console.log({userIdArray})
      if(userIdArray.length>10){
        return this.utility.showAlert("Please do not select more than 10 candidates!")
      }
      const dialog = this.dialog.open(CreateContractPopupFromInvite, {
        width: "694px",
        panelClass: "custom_contract",
        data: {
          applicant,
          jobDetails: this.jobDetails,
          applyType: APPLY_TYPE.JOB_OFFER,
          userIdArray:userIdArray,
          // previousState:previousState,
          isFromInvite:true
        },
        disableClose: false,
        autoFocus: false,
      });
      const refreshList = await dialog.afterClosed().toPromise();
      if (refreshList) {
        this.resetSelection()
        this.refreshList(refreshList);
        this.getJobDetails();
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  resetSelection(){
    this.showCheckbox = false;
    this.selectedIds = [];
    this.selectionType = "None";
    this.refreshList(true);
  }
  
}
