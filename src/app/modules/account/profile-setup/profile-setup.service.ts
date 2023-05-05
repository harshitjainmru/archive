import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ACCOUNT_API_GROUP, JOB_AREA } from 'src/app/constants/urls';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Subject } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UtilityService } from 'src/app/services/utility.service';
import { PATTERN } from 'src/app/constants/patterns';

@Injectable()
export class ProfileSetupService {
  currentLocationData: any;
  // ...........step one............
  firstStepForm: FormGroup;
  companyLogoUrl: string = null;
  companyPhotoUrl: string = null;
  // .........Step two.................
  secondStepForm: FormGroup;
  countryLists: any = [];
  stateLists: any = [];
  cityLists: any = [];
  zipLists: any = [];
  // ...........step three.............
  thirdStepForm: FormGroup;
  companyDocUrl: string = null;
  companyCertUrl: any[] = [];
  selectedCategories: any = [];
  companyDocFile: any;
  companyCertFile: any;
  manageProfileStep: Subject<number> = new Subject<number>();
  // ...............................
  stateCityLists;

  constructor(
    private http: HttpService,
    private _fb: FormBuilder,
    private _userProfileService: UserProfileService,
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _utilityService: UtilityService,
    private _fileUploadService: FileUploadService
  ) {
    this.creatForm();
    this.getProfileDetails();
  }

  creatForm() {
    this.firstStepForm = this._fb.group({
      companyName: this._formService.getControl('name'),
      companyWebsite: this._formService.getControl('webSite', false),
      companyDescription: this._formService.getControl('descriptionMax400'),
      uenNumber: this._formService.getControl('uen'),
      tradingName: this._formService.getControl('name'),
      companyLogo: [''],
      companyPhoto: [''],
    });

    this.secondStepForm = this._fb.group({
      jobArea: ['', Validators.required],
      name: [''],
      cityId: [''],
      stateId: [''],
      street: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
          Validators.required,
        ],
      ],
      city: [''],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(16),
          Validators.pattern(PATTERN.alphaNumeric),
        ],
      ],
      country: [this._utilityService.countryPayload.countryName || ''],
      countryId: [this._utilityService.countryPayload.countryId || ''],
    });

    this.thirdStepForm = this._fb.group({
      businessCategories: ['', Validators.required],
      verifiedDocumentUrl: this._formBuilder.array([], [Validators.required]),
    });
  }

  /**
   * Uploads file
   * @param file file event
   * @returns  path of uploaded file
   */
  uploadFile(file: File) {
    return this._fileUploadService.uploadFile(file);
  }

  createfileGroup() {
    return this._formBuilder.group({
      url: [''],
      type: [''],
      name: [''],
      file: [''],
    });
  }

  // This will set profile
  setProfileForm(data) {
    const profileStep = data['profileSteps'] ? data['profileSteps'] + 1 : 0;
    if (data['profileSteps'] === 1 || data['profileSteps'] === 2) {
      const companyData = data['companyDetails'];
      this.firstStepForm.patchValue(companyData);
      this.companyLogoUrl = companyData['companyLogo'];
      this.companyPhotoUrl = companyData['companyPhoto'];
    }

    this.manageProfileStep = profileStep;
  }

  // This will get profile details
  getProfileDetails() {
    this._userProfileService.getProfileDetail().then((data) => {
      this.setProfileForm(data);
    });
  }

  // This will profile setup
  profileSetup(body: any) {
    return this.http
      .post(ACCOUNT_API_GROUP.PROFILE_SETUP, body, { showLoader: true })
      .toPromise();
  }

  // This will update Profile Request
  updateProfileRequest(body: any) {
    return this.http
      .put(ACCOUNT_API_GROUP.PROFILE_UPDATE, body, { showLoader: true })
      .toPromise();
  }

  // This will update Company Details Request
  updateCompanyDetailsRequest(body: any) {
    return this.http
      .put(ACCOUNT_API_GROUP.COMPANY_UPDATE, body, { showLoader: true })
      .toPromise();
  }

  //This will get businness category
  businnessCategory(body: any) {
    console.log(body);
    return this.http
      .get(ACCOUNT_API_GROUP.BUSINESS_CATEGORY, body, { showLoader: true })
      .toPromise();
  }

  // This api will get country DropDwon data
  async countryDropDwon(query: any = {}) {
    if (this.countryLists.length) {
      return this.countryLists;
    } else {
      const { data } = await this.http
        .get(ACCOUNT_API_GROUP.DROPDWON_COUNTRY, query, { showLoader: true })
        .toPromise();
      this.countryLists = data;
      return this.countryLists;
    }
  }

  // This api will get state DropDwon data
  async stateDropDwon(query: any = {}, refresh: boolean = false) {
    if (this.stateLists.length && !refresh) {
      return this.stateLists;
    } else {
      const { data } = await this.http
        .get(ACCOUNT_API_GROUP.DROPDWON_STATE, query, { showLoader: true })
        .toPromise();
      this.stateLists = data;
      return this.stateLists;
    }
  }

  // This api will get city DropDwon data
  async cityDropDwon(query: any = {}, refresh: boolean = false) {
    if (this.cityLists.length && !refresh) {
      return this.cityLists;
    } else {
      const { data } = await this.http
        .get(ACCOUNT_API_GROUP.DROPDWON_CITY, query, { showLoader: true })
        .toPromise();
      this.cityLists = data;
      return this.cityLists;
    }
  }

  // This api will get zipDropDwon data
  async zipDropDwon(query: any = {}, refresh: boolean = false) {
    if (this.zipLists.length && !refresh) {
      return this.zipLists;
    } else {
      const { data } = await this.http
        .get(ACCOUNT_API_GROUP.DROPDWON_ZIPCODE, query, { showLoader: true })
        .toPromise();
      this.zipLists = data;
      return this.zipLists;
    }
  }

  // This will get zip code DropDwon api
  zipcodeDropDwon(query: any = {}) {
    return this.http
      .get(ACCOUNT_API_GROUP.DROPDWON_ZIPCODE, query, { showLoader: true })
      .toPromise();
  }

  // async stateCityDropDwon() {
  //   if (this.stateCityLists) {
  //     return this.stateCityLists;
  //   } else {
  //     const { data } = await this.http.get(JOB_AREA, { ...this.countryService.countryId }, { showLoader: true }).toPromise();
  //     const single = data.filter(item => !item['isMulti']);
  //     this.stateCityLists = single;
  //     return this.stateCityLists;
  //   }
  // }

  // This will get job area list
  jobAreaList(query: any = {}, refresh: boolean = false) {
    return this.http.get(JOB_AREA, query).toPromise();
  }
}
