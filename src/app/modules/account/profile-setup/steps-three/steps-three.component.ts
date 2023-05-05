import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import {
  DOC_TYPE,
  DROPDOWN_TYPE,
  CUSTOM_HANDLE_ERROR,
} from 'src/app/constants/enums';
import { onSelectFile } from 'src/app/constants/file-input';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ProfileSetupService } from '../profile-setup.service';
import { ISearchAutocomplete } from 'src/app/models/common.interface';
import { ACCOUNT_API_GROUP } from 'src/app/constants/urls';
import {
  SESSION_KEYS,
  DOCUMENT_FORMAT,
  DOCUMENT_FORMAT_ERROR,
  MAX_DOCUMENT_SIZE,
  MAX_SIZE_ERROR,
} from 'src/app/constants/constant';
import { LoaderService } from 'src/app/services/loader.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

console.log('chchchch');
@Component({
  selector: 'app-steps-three',
  templateUrl: './steps-three.component.html',
  styleUrls: ['./steps-three.component.scss'],
})
export class StepsThreeComponent implements OnInit, AfterViewInit {
  @Output() stepThreeData = new EventEmitter();
  thirdStepForm: FormGroup;
  companyDocUrl: string;
  companyCertUrl: any[] = [];
  companyDocFile: any;
  companyCertFile: any;
  searchValue = new FormControl(['']);
  categoryData: any = [];
  docType = DOC_TYPE;
  searchBusinessUrl = ACCOUNT_API_GROUP.BUSINESS_CATEGORY;
  stateType = DROPDOWN_TYPE.BUSINESS_CATEGORY;

  businessCategoriesConfig: ISearchAutocomplete = {
    url: ACCOUNT_API_GROUP.BUSINESS_CATEGORY,
    isPagination: true,
    // control:this.userFilterForm.get('jobArea') as FormControl,
    viewKey: 'name',
    valueKey: '_id',
    selectedValue: [],
    selectedViewValue: [],
    placeholder: 'Search by Category',
    localSave: true,
    localSaveKey: 'BUSINESS_CATEGORIES',
    limit: 1,
  };
  documentFormats = DOCUMENT_FORMAT;
  documents = [];

  @ViewChild('inputSelection') inputSelection: ElementRef;

  public propertySlider: SwiperConfigInterface;
  @ViewChild('next') next: ElementRef;
  @ViewChild('prev') prev: ElementRef;
  activeIndex = 0;
  sliderImages: any[] = [];

  constructor(
    private _uploadService: FileUploadService,
    private _setupService: ProfileSetupService,
    private _utilityService: UtilityService,
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {
    this.sliderImages = [
      'assets/images/noimage.png',
      'assets/images/noimage.png',
    ];
  }

  ngOnInit(): void {
    this.thirdStepForm = this._setupService.thirdStepForm;
    this.companyCertUrl = this._setupService.companyCertUrl;

    // const businessCategoriesSelctedValue = this._utilityService.getSessionStorage(
    //   SESSION_KEYS.BUSINESS_CATEGORIES
    // )?.selectedValue;
    // const businessCategoriesSelectedView = this._utilityService.getSessionStorage(
    //   SESSION_KEYS.BUSINESS_CATEGORIES
    // )?.selectedViewValue;

    // this.businessCategoriesConfig = {
    //   ...this.businessCategoriesConfig,
    //   selectedControl: this.thirdStepForm.get("businessCategories") as FormControl,
    //   control: new FormControl(""),
    //   selectedValue:
    //     businessCategoriesSelctedValue && businessCategoriesSelctedValue.length
    //       ? businessCategoriesSelctedValue
    //       : [],
    //   selectedViewValue:
    //     businessCategoriesSelectedView && businessCategoriesSelectedView.length
    //       ? businessCategoriesSelectedView
    //       : [],
    // };

    // if(businessCategoriesSelctedValue && businessCategoriesSelctedValue.length){
    //   this.businessCategoriesConfig.selectedControl.setValue(businessCategoriesSelctedValue.map(item => item._id));
    // }
  }

  /**
   * Getter for documents as FormArray
   */
  get docsFormArray() {
    return this.thirdStepForm.get('verifiedDocumentUrl') as FormArray;
  }

  /**
   * Removes index from form array
   * @param index number
   */
  remove(index) {
    this.docsFormArray.removeAt(index);
    this.documents.splice(index, 1);
    this.companyCertUrl.splice(index, 1);
  }

  /**
   * Determines whether select document on
   * @param event from select input
   */
  async onSelectDocument(event) {
    if (this.documents.length >= 5) {
      this._utilityService.showAlert('Cannot select more than 5 documents');

      return;
    }
    try {
      let result = await onSelectFile(event, DOCUMENT_FORMAT, 5);
      for (let i = 0; i < result.length; i++) {
        const singleImageGroup = this._setupService.createfileGroup();
        singleImageGroup.patchValue({
          url: result[i].url,
          file: result[i].file,
          name: result[i].file.name,
          type: result[i].type,
        });
        this.documents.push(singleImageGroup.value);

        this.docsFormArray.push(singleImageGroup);
        console.log('kokok', this.docsFormArray);
      }

      this.companyCertUrl = [...this.documents];
      this.inputSelection.nativeElement.value = null;

      // this.inputSelection.nativeElement.value = null;
    } catch (err) {
      if (err.type === CUSTOM_HANDLE_ERROR.FILE_TYPE) {
        this._utilityService.showAlert(DOCUMENT_FORMAT_ERROR(DOCUMENT_FORMAT));
      } else if (err.type === CUSTOM_HANDLE_ERROR.FILE_SIZE) {
        this._utilityService.showAlert(MAX_SIZE_ERROR(5));
      }
      this.inputSelection.nativeElement.value = null;
    }
  }

  get secondStepStatus() {
    return this.thirdStepForm.valid && !!(this.companyCertUrl.length >= 2);
  }

  getUnReferenced(data) {
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * after view init life cycle hook
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.propertySlider = {
        slidesPerView: 1,
        observer: true,
        direction: 'horizontal',
        initialSlide: 0,
        navigation: {
          nextEl: this.next.nativeElement,
          prevEl: this.prev.nativeElement,
        },
        mousewheel: true,
        controller: true,
        pagination: true,
        watchOverflow: true,

        spaceBetween: 10,
      };
      this.activeIndex = 0;

      this.cdRef.detectChanges();
    }, 500);
  }

  // This will submit third Step form group data
  async onthirdStepSubmit() {
    if (this.thirdStepForm.invalid) {
      return;
    }

    const data = { ...this.thirdStepForm.value };
    try {
      if (this.documents.length) {
        for (let i = 0; i < data.verifiedDocumentUrl.length; i++) {
          if (data.verifiedDocumentUrl[i].file) {
            const uploadedResult: any = await this._setupService.uploadFile(
              data.verifiedDocumentUrl[i].file
            );
            this.loaderService.loader.next(false);

            data.verifiedDocumentUrl[i].url = uploadedResult.Location;
          }
        }
      }

      data['businessCategories'] = [
        {
          _id: data.businessCategories._id,
          name: data.businessCategories.name,
        },
      ];

      this.businessCategoriesConfig.selectedValue.map((item) => {
        return { _id: item._id, name: item.name };
      });

      data['verifiedDocumentUrl'] = data.verifiedDocumentUrl.map((img) =>
        img.url ? img.url : img
      );

      // data['businessCategories'] = this.selectedCategories;
      this._setupService.companyCertUrl = [...this.documents];
      console.log('waooaoa', data);
      this.stepThreeData.emit({ ...data, profileSteps: 3 });
    } catch (error) {
      // console.log(error);
    }
  }
}
