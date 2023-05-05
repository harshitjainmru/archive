import { Component, OnInit } from "@angular/core";
import { ApplicantService } from "../applicant.service";
import * as Joi from "joi-browser";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormUtils } from "src/app/constants/form.util";
import { UtilityService } from "src/app/services/utility.service";
import { APPLY_TYPE, CANDIDATE_STATUS } from "src/app/constants/enums";
import { CreateRequestComponent } from "../../../user/request-module/create-request/create-request.component";
import { MatDialog } from "@angular/material/dialog";
import { CreateContractPopupComponent } from "../../search-applicant/create-contract-popup/create-contract-popup.component";
import { APPLICANT_LIST } from "src/app/constants/routes";

@Component({
  selector: "app-applicant-details",
  templateUrl: "./applicant-details.component.html",
  styleUrls: ["./applicant-details.component.scss"],
})
export class ApplicantDetailsComponent implements OnInit {
  filterSchema: any;
  filterObject;
  firstTimeLoading = true;
  currentIndex: number = 0;
  pageOptions = { page: 1, limit: 10 };
  sub: Subscription = new Subscription();
  applicantsList: Array<any> = [];
  applicantDetails: any = null;
  candidateStatus = CANDIDATE_STATUS;
  jobId;
  nextRating = true;
  applyId: any;
  allRatings = [];
  shiftIcons: any = {
    early: {
      title: "early",
      iconPath: "assets/icons/Early_Shift.svg",
    },
    day: {
      title: "day",
      iconPath: "assets/icons/Day_Shift.svg",
    },
    night: {
      title: "night",
      iconPath: "assets/icons/Night_Shift.svg",
    },
    all: {
      title: "any",
      iconPath: "assets/icons/All_shift.svg",
    },
    "": {
      title: "",
      iconPath: "null",
    },
  };

  hideOfferBtn=true;
  hideInviteBtn=true;
  constructor(
    private applicantService: ApplicantService,
    private activatedRoute: ActivatedRoute,
    private utility: UtilityService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.jobId = this.activatedRoute.snapshot.paramMap.get("jobId");
    this.applyId = this.activatedRoute.snapshot.queryParamMap.get("applyId");
    console.log(this.jobId, "jbo idd????");
    this.applicantsList = this.applicantService.applicantList.filter(item => {
      item.status!='deleted'
    });
    console.log(this.applicantsList);
    this.createSchema();
    this.listenQueryParamChanges();
  }
  createSchema() {
    this.filterSchema = Joi.object({
      applicantId: Joi.optional(),
      applyId: Joi.optional(),
    });
  }

  listenQueryParamChanges() {
    this.sub.add(
      this.activatedRoute.queryParams
        .pipe(switchMap((data) => this.validateFilters({ ...data })))
        .subscribe(({ data }) => {
          if (data) {
            const query = this.allQueryParams();
            // console.log(data);
            if (query?.applyId) {
              this.applicantDetails = data[0];
              this.getFileTypes();
              
            } else {
              this.applicantDetails = data;
              this.getFileTypes();
            }
            this.getAllRatings();
            this.checkOffer();
          }
        })
    );
  }

 

  
  getFileTypes() {
    if (
      this.applicantDetails?.certificates &&
      this.applicantDetails?.certificates?.length
    ) {
      this.applicantDetails.certificates.map((item) => {
        const type = item.document.split(".");
        item.type = type[type.length - 1];
      });
    }
  }

  getApplicantList() {
    return this.applicantService.getApplicantDetails(this.allQueryParams());
  }

  validateFilters(queryParams) {
    // console.log(queryParams);
    this.filterObject = this.activatedRoute.snapshot.queryParams;
    // console.log(this.filterObject);
    const { applicantId } = this.filterObject;
    if (this.applyId) {
      this.currentIndex =
        this.applicantsList.findIndex(
          (item) => item.applicant._id == applicantId
        ) || 0;
    } else {
      console.log(applicantId, this.applicantsList);

      this.currentIndex =
        this.applicantsList.findIndex((item) => item._id == applicantId) || 0;
      console.log(this.currentIndex, "current idnex? ????");
    }
    if (!this.firstTimeLoading) {
      return this.getApplicantList();
    }
    // console.log(this.filterObject);

    return new Observable((observer) => {
      try {
        Joi.validate(queryParams, this.filterSchema, (err, value: any) => {
          if (err) {
            throw err;
          } else {
            this.filterObject = { ...this.filterObject, ...value };
            this.firstTimeLoading = false;
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
      } catch (error) {}
    });
  }
  allQueryParams() {
    return this.utility.formatData(
      FormUtils.parse({
        ...this.filterObject,
      })
    );
  }

  routeToApplicantTab() {
    this.router.navigate([APPLICANT_LIST.fullUrl(this.jobId)],{queryParams:{page: 1, limit: 10, status: this.applicantDetails?.currentApplicationStatus}});
  }

  next() {
    if (this.currentIndex >= this.applicantsList.length - 1) {
      return;
    }
    this.currentIndex = this.currentIndex + 1;
    if (this.applyId) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: FormUtils.parse({
          applicantId: this.applicantsList[this.currentIndex].applicant._id,
          applyId: this.applicantsList[this.currentIndex]._id,
        }),
        // queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: FormUtils.parse({
          applicantId: this.applicantsList[this.currentIndex]._id,
          // applyId: this.applicantsList[this.currentIndex]._id,
        }),
        // queryParamsHandling: 'merge',
      });
    }
  }
  async changeStatus(status: CANDIDATE_STATUS) {
    console.log(this.allQueryParams().applyId);

    const res = await this.applicantService.changeStatus(
      [this.allQueryParams().applyId],
      status,
      this.applicantDetails?.currentApplicationStatus,
      this.jobId
    );
    this.applicantDetails.currentApplicationStatus = status;
    // this.validateFilters(this.allQueryParams());
  }
 
  previous() {
    if (this.currentIndex <= 0) {
      return;
    }
    this.currentIndex = this.currentIndex - 1;

    if (this.applyId) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: FormUtils.parse({
          applicantId: this.applicantsList[this.currentIndex].applicant._id,
          applyId: this.applicantsList[this.currentIndex]._id,
        }),
        // queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: FormUtils.parse({
          applicantId: this.applicantsList[this.currentIndex]._id,
          // applyId: this.applicantsList[this.currentIndex]._id,
        }),
        // queryParamsHandling: 'merge',
      });
    }
  }

  openDocument(url) {
    window.open(url);
  }

  async getAllRatings() {
    const res = await this.applicantService.getAllRatings(
      this.applicantDetails._id,
      this.pageOptions
    );
    this.nextRating = res.data.next;
    this.allRatings = [...this.allRatings, ...res.data.result];
    console.log(res);
  }

  onScroll() {
    if (this.nextRating) {
      this.pageOptions.page = this.pageOptions.page + 1;
      this.getAllRatings();
    }
  }
  downloadResume() {
    if (this.applicantDetails?.resume) {
      window.open(this.applicantDetails?.resume);
    } else {
      this.utility.showAlert("Resume not available.");
    }
  }

  reportCandidate() {
    const dialogRef = this.dialog.open(CreateRequestComponent, {
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: { applicant: this.applicantDetails },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // this.refreshList.emit(true);
      }
    });
  }
  ngOnInit(): void {}

  /**
   * Opens job offer popup to send offer
   * @param {applicant,previousState} 
   * @returns  
   */
  async openJobOfferPopup(applicant=this.applicantDetails,previousState='MAKE_AN_OFFER') {
    try {

      // const userIdArray = applicant ? [applicant._id] : [...this.selectedIds];
      // console.log({userIdArray})
      // if(userIdArray.length>10){
      //   return this.utilityService.showAlert("Please do not select more than 10 candidates!")
      // }
      const { data:jobDetails } = await this.applicantService.getJobDetails(this.jobId); 
      const dialog = this.dialog.open(CreateContractPopupComponent, {
        width: "694px",
        panelClass: "custom_contract",
        data: {
          applicant,
          jobDetails: jobDetails,
          applyType: APPLY_TYPE.JOB_OFFER,
          userIdArray:[applicant._id],
          previousState:previousState
        },
        disableClose: false,
        autoFocus: false,
      });
      const refreshList = await dialog.afterClosed().toPromise();
      if (refreshList) {
        // this.resetSelection()
        this.checkOffer();
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  async checkOffer(){
    if(this.jobId && this.applicantDetails._id){

      const payload={jobId:this.jobId,userId:this.applicantDetails._id}
      
      try {
        const res= await this.applicantService.checkOffer(payload).toPromise();
        console.log(res)
        this.hideOfferBtn=res?.data?.makeOffer?true:false;
        this.hideInviteBtn=res?.data?.invitation?true:false;
      } catch (error) {
        
      }
    }
  }

  async sendInvites() {
    try {
      const userIdArray =[this.applicantDetails._id];
      // if(userIdArray.length>10){
      //   return this.utilityService.showAlert("Please do not select more than 10 candidates!")
      // }
      const payload = {
        userId: userIdArray,
        jobId: this.jobId,
      };

      console.log(payload)

      
      const resp = await this.applicantService.sendInite(payload);
      this.checkOffer();
      this.utility.showAlert(resp?.message);
    } catch (error) {}
  }
}
