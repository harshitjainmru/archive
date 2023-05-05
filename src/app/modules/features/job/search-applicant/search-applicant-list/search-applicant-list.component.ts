import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import * as Joi from "joi-browser";
import { Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import {
  LIMIT_KEY,
  PAGE_KEY,
  PAGE_OPTION_LIMIT,
  SEARCH_APPLICANT_LIST_SORTING,
  SESSION_KEYS,
} from "src/app/constants/constant";
import {
  APPLY_TYPE,
  CANDIDATE_STATUS,
  DIALOG_RESPONSE,
} from "src/app/constants/enums";
import { FormUtils } from "src/app/constants/form.util";
import { Pagination } from "src/app/constants/pagination";
import {
  APPLICANT_DETAILS,
  APPLICANT_LIST,
  SEARCH_APPLICANT_DETAILS,
  SEARCH_APPLICANT_LIST,
} from "src/app/constants/routes";
import { PageConfig } from "src/app/models/common.interface";
import { FormService } from "src/app/services/form.service";
import { UtilityService } from "src/app/services/utility.service";
import { ApplicantFilterComponent } from "../../applicant/applicant-list/applicant-filter/applicant-filter.component";
import { ApplicantService } from "../../applicant/applicant.service";
import { CreateContractPopupComponent } from "../create-contract-popup/create-contract-popup.component";
import { InviteCandidatePopupComponent } from "../invite-candidate-popup/invite-candidate-popup.component";
import { SearchApplicantFilterComponent } from "../search-applicant-filter/search-applicant-filter.component";

@Component({
  selector: "app-search-applicant-list",
  templateUrl: "./search-applicant-list.component.html",
  styleUrls: ["./search-applicant-list.component.scss"],
})
export class SearchApplicantListComponent
  extends Pagination
  implements OnInit, OnDestroy
{
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
  jobMatMenu = SEARCH_APPLICANT_LIST_SORTING;
  sorting = "Sort by";
  selectedIds: Array<string> = [];
  navLinks = [];
  candidateStatus = CANDIDATE_STATUS;
  sortKey: string = "";
  vacancies: number = 0;

  invitedCount: number = 0;
  activatedSub: Subscription;

  ///////
  SEARCH_SORT_FILTER_KEYS = [
    "search",
    "status",
    "jobId",
    "skills",
    "jobSite",
    "rating",
    "appliedOn",
    "experience",
    PAGE_KEY,
    LIMIT_KEY,
    "sortKey",
    "sortOrder",
  ];

  constructor(
    private dialog: MatDialog,
    private applicantService: ApplicantService,
    private activatedRoute: ActivatedRoute,
    private utility: UtilityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private utilityService: UtilityService
  ) {
    super();
    this.createSchema();
    this.createSearchSortFilter();
    this.activatedSub = this.activatedRoute.params.subscribe(({ jobId }) => {
      if (jobId) {
        this.jobId = jobId;
        this.getJobDetails();
      }
    });
    this.currentQueryParams = this.activatedRoute.snapshot.queryParams;
    this.searchSortFilter.patchValue(this.currentQueryParams);
    this.listenQueryParamChanges();
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    if(this.activatedSub){
      this.activatedSub.unsubscribe()
    }
    this.resetSessionStg();
  }
  ngOnInit(): void {}

  async getJobDetails() {
    try {
      const { data } = await this.applicantService.getJobDetails(this.jobId);
      this.jobDetails = data;
      this.vacancies = data.vacancies;
      this.invitedCount = data.totalInvitationCount;
    } catch (error) {
      console.log("error in fething job details");
    }
  }
 
  /**
   * Creates search sort filter
   * @returns  filter
   */
  createSearchSortFilter() {
    this.searchSortFilter = this.formBuilder.group({
      ...this.formService.genrateControlsObj(this.SEARCH_SORT_FILTER_KEYS),
    });
  }

  resetSessionStg() {
    this.utilityService.clearSessionStorage(
      SESSION_KEYS.APPLICANT_FILTER_SKILLS
    );
    this.utilityService.clearSessionStorage(
      SESSION_KEYS.JOB_SITE
    );
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
      jobSite:Joi.optional(),
      jobRole:Joi.optional(),
      isPreviouslyHired:Joi.optional(),
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
                ? SEARCH_APPLICANT_LIST_SORTING.find(
                    (list) =>
                      list.sortKey == this.searchSortFilter.value.sortKey
                  )
                  ? SEARCH_APPLICANT_LIST_SORTING.find(
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
    this.filterObject = queryParams ;
   
    if (!this.filterObject.jobId) {
      this.filterObject = {
        ...this.filterObject,
        jobId: this.jobId,
      };
    }

    if (!this.firstTimeLoading) {
      return this.getApplicantList();
    }
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
        this.filterObject = { ...this.pageParams, ...this.filterObject };
        this.router.navigate([SEARCH_APPLICANT_LIST.fullUrl(this.jobId)], {
          queryParams: this.utility.formatData(
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
    return this.utility.formatData(
      FormUtils.parse({
        ...this.filterObject,
        ...this.pageParams,
        jobId: this.jobId,
      })
    );
  }

  /**
   * Gets Applicant list
   * @returns  listing of job according to queryparams
   */
  getApplicantList() {
    return this.applicantService.getApplicantListSearch(this.allQueryParams());
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
          ? { ...this.filterObject }
          : {},
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
    const subscription = this.dialog
      .open(SearchApplicantFilterComponent, {
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
        if (filterValue.type === DIALOG_RESPONSE.CANCEL) {
          return;
        }
        if (filterValue && filterValue.type === DIALOG_RESPONSE.APPLY) {
          this.filterCount = Object.keys(filterValue.data).length;

          this.searchSortFilter.reset();
          
          this.filterObject = {
            ...PAGE_OPTION_LIMIT(10),
            ...filterValue.data,
            jobId: this.jobId,
            // status: this.status,
          };
          this.page = PAGE_OPTION_LIMIT(10).page;
          this.searchSortFilter.patchValue({
            ...filterValue.data,
            // status: this.status,
            jobId: this.jobId,
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: FormUtils.parse({
              // status: this.status,
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
            // status: this.status,
          };
          this.page = PAGE_OPTION_LIMIT(10).page;
          // this.refreshList();

          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: FormUtils.parse({
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
      this.applicantList.forEach((applicant) => {
        !applicant.isInviteSend && this.selectedIds.push(applicant._id);
      });
      return;
    }
    this.selectedIds = [];
  }

  handleAddRemove(checked, id) {
    checked ? this.selectedIds.push(id) : this.removeId(id);
    if (this.selectedIds.length == this.applicantList.length) {
      this.selectionType = "Select All";
    }
  }

  removeId(id) {
    const idx = this.selectedIds.indexOf(id);
    this.selectedIds.splice(idx, 1);
    this.selectionType = "Select Individually";
  }

  async changeStatusBulk(status: CANDIDATE_STATUS) {
    const res = await this.applicantService.changeStatus(
      [...this.selectedIds],
      status,
      this.status,
      this.jobId
    );
    this.resetSelection();
  }

  async openJobOfferPopup({applicant,previousState}) {
    try {

      const userIdArray = applicant ? [applicant._id] : [...this.selectedIds];
      if(userIdArray.length>10){
        return this.utilityService.showAlert("Please do not select more than 10 candidates!")
      }
      const dialog = this.dialog.open(CreateContractPopupComponent, {
        width: "694px",
        panelClass: "custom_contract",
        data: {
          applicant,
          jobDetails: this.jobDetails,
          applyType: APPLY_TYPE.JOB_OFFER,
          userIdArray:userIdArray,
          previousState:previousState
        },
        disableClose: false,
        autoFocus: false,
      });
      const refreshList = await dialog.afterClosed().toPromise();
      if (refreshList) {
        this.resetSelection()
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  async changeStatus({ ids, status, previousState, jobId }) {
    const res = await this.applicantService.changeStatus(
      ids,
      status,
      previousState,
      jobId
    );
    this.refreshList(true);
  }


  routeToDetails({ applicantId }) {
    this.applicantService.applicantList = [...this.applicantList];
    this.router.navigate([SEARCH_APPLICANT_DETAILS.fullUrl(this.jobId)], {
      queryParams: { applicantId },
    });
  }

 
  async openCandidatePopup(event, userId?) {
    try {
      const userIdArray = userId ? [userId] : [...this.selectedIds];
      const inviteDialog = await this.dialog
        .open(InviteCandidatePopupComponent, {
          width: "694px",
          data: { userId: userIdArray, jobId: this.jobId },
          disableClose: false,
          autoFocus: false,
        })
        .afterClosed()
        .toPromise();

    } catch (error) {}
  }

  async sendInvites(event, userId?) {
    try {
      const userIdArray = userId ? [userId] : [...this.selectedIds];
      if(userIdArray.length>10){
        return this.utilityService.showAlert("Please do not select more than 10 candidates!")
      }
      const payload = {
        userId: userIdArray,
        jobId: this.jobId,
      };

      
      const resp = await this.applicantService.sendInite(payload);
      this.resetSelection() 
      this.utilityService.showAlert(resp?.message);
    } catch (error) {}
  }

  resetSelection(){
    this.showCheckbox = false;
    this.selectedIds = [];
    this.selectionType = "None";
    this.refreshList(true);
  }
}
