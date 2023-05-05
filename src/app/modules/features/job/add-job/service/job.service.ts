import { Injectable } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  JOBS_API,
  JOB_ADDRESS,
  JOB_AREA,
  JOB_ROLES,
  JOB_SKILL,
} from "src/app/constants/urls";
import { VALIDATION_CRITERIA } from "src/app/constants/validation-criteria";
import { HttpService } from "src/app/services/http.service";
import { UserProfileService } from "src/app/services/user-profile.service";
import { UtilityService } from "src/app/services/utility.service";
@Injectable()
export class JobService {
  selectedJobRole: any = null;
  jobId: string = "";
  isBackClick: boolean = false;
  jobDetails: any = "";
  userData;
  countryData: any = {};
  isPublished: boolean = false;
  isPublishStatus: string = "";
  limit = VALIDATION_CRITERIA;
  // ...........step one............
  firstStepForm: FormGroup;
  jobAreaSite: FormArray;
  jobAreaGroup: FormGroup;
  jobArea;
  // .........Step two.................
  secondStepForm: FormGroup;
  categoryList = [];
  skillData = [];
  roleLists = [];
  addressData = [];
  constantsData;
  // ...........step three.............
  thirdStepForm: FormGroup;
  selectedCategories: any = [];
  // ...............................

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private _userProfileService: UserProfileService,
    private utilityService: UtilityService
  ) {
    this.getProfileDetails();
    this.countryData = this._userProfileService.countryInfo;
  }

  createThirdStepForm(minSalary) {
    return this.fb.group({
      baseSalary: this.fb.group({
        salary: [
          "",
          [Validators.required, Validators.min(minSalary), Validators.max(999)],
        ],
        currency: [
          this.utilityService.countryPayload.currency,
          Validators.required,
        ],
      }),
      timeline: this.fb.group({
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
      }),
      vacancies: ["", [Validators.required, Validators.min(1)]],
      workingHours: this.fb.group({
        hours: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(60),
        ]),
        days: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(7),
        ]),
      }),
      jobSite: this.fb.array([this.createJobSite()]),
    });
  }
  creatForm() {
    this.firstStepForm = this.fb.group({
      businessCategoryId: [this.userData.businessCategories[0]._id],
      jobRoleId: ["", [Validators.required]],
    });

    this.secondStepForm = this.fb.group({
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(this.limit.nameMinLength),
          Validators.maxLength(this.limit.nameMaxLength),
        ],
      ],
      // vacancies: ["", [Validators.required, Validators.min(1)]],
      skills: ["", [Validators.required]],
      experienceType: [""],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(this.limit.descriptionMinLength),
          Validators.maxLength(this.limit.descriptionMaxLength1200),
        ],
      ],
      requirment: [
        "",
        // [
        //   Validators.minLength(this.limit.descriptionMinLength),
        //   Validators.maxLength(this.limit.descriptionMaxLength1200),
        // ],
      ],
    });
    this.thirdStepForm = this.fb.group({
      baseSalary: this.fb.group({
        salary: ["", [Validators.required, Validators.max(9999)]],
        currency: [
          this.utilityService.countryPayload.currency,
          Validators.required,
        ],
      }),
      vacancies: ["", [Validators.required, Validators.min(1)]],
      timeline: this.fb.group({
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
      }),
      workingHours: this.fb.group({
        hours: new FormControl(null, [Validators.required, Validators.max(60)]),
        days: new FormControl(null, [Validators.required, Validators.max(7)]),
      }),
      jobSite: this.fb.array([this.createJobSite()]),
    });
  }

  createJobSite(): FormGroup {
    return this.fb.group({
      addressId: ["", [Validators.required]],
      address: ["", [Validators.required]], // internal use only (full address to show on preview page)
      noOfWorkers: ["", [Validators.required]],
      timeSlots: this.fb.array([this.createTimeSlot()]),
    });
  }

  createTimeSlot(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required]],
      startTime: [
        new Date(new Date().setHours(9, 0, 0, 0)),
        [Validators.required],
      ],
      endTime: [
        new Date(new Date().setHours(14, 0, 0, 0)),
        [Validators.required],
      ],
      additionalAllowance: this.fb.group({
        salary: ["0", [Validators.max(999)]],
        currency: [this.utilityService.countryPayload.currency],
      }),
    });
  }

  setSecondStepForm(data) {
    const locationData = data["location"];
    this.secondStepForm.patchValue(locationData);
  }

  async getProfileDetails() {
    if (this.userData) {
      return this.userData;
    } else {
      const data = await this._userProfileService.getProfileDetail();
      this.userData = data;
      return this.userData;
    }
  }

  async createJob(body: any) {
    body = { ...body, countryId: this.userData.countryId };
    if (this.jobId) {
      body = { ...body, jobId: this.jobId };
    }
    if (this.isPublished || this.jobId) {
      const resp = await this.httpService
        .put(JOBS_API, body, { showLoader: true })
        .toPromise();
      this.jobId = resp["data"]._id;
      return resp;
    } else {
      const resp = await this.httpService
        .post(JOBS_API, body, { showLoader: true })
        .toPromise();
      if (resp["data"]._id) {
        this.jobId = resp["data"]._id;
      }
      return resp;
    }
  }

  async addJob(body) {
    body = { ...body, countryId: this.userData.countryId };
    const response = await this.httpService
      .post(JOBS_API, body, { showLoader: true })
      .toPromise();
    return response;
  }

  // JOB ADDRESS API
  addressList(query = {}): Promise<any> {
    return this.httpService.get(JOB_ADDRESS, query).toPromise();
  }
  addAddress(query: any = {}, refresh: boolean = false) {
    query = { ...query, countryId: this.userData.countryId };
    return this.httpService.post(JOB_ADDRESS, query).toPromise();
  }

  // JOB AREA API
  jobAreaList(query: any = {}, refresh: boolean = false) {
    return this.httpService.get(JOB_AREA, query).toPromise();
  }

  // JOB SKILL API
  jobSkillList(query: any = {}, refresh: boolean = false) {
    return this.httpService.get(JOB_SKILL, query).toPromise();
  }
  // JOB ROLE API
  jobRoleList(query: any = {}, refresh: boolean = false) {
    return this.httpService
      .get(JOB_ROLES, { ...query, isClient: true })
      .toPromise();
  }

  // JOB DETAIL API
  jobDetail(jobId: any = "", refresh: boolean = false) {
    console.log(`${JOBS_API}/${jobId}/`);

    return this.httpService
      .get(`${JOBS_API}/${jobId}/`, {}, { showLoader: true })
      .toPromise();
  }

  searchList(url, query: any = {}, refresh: boolean = false) {
    return this.httpService.get(url, query).toPromise();
  }
  jobListing(query) {
    return this.httpService
      .get(JOBS_API, query, { showLoader: true })
      .toPromise();
  }
}
