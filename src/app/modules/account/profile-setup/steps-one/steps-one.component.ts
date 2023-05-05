import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DOC_TYPE,
  INFORMATION_TYPE,
  CUSTOM_HANDLE_ERROR,
} from 'src/app/constants/enums';
import { onSelectFile } from 'src/app/constants/file-input';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProfileSetupService } from '../profile-setup.service';
import {
  IMAGE_FORMAT,
  DOCUMENT_FORMAT_ERROR,
  MAX_SIZE_ERROR,
} from 'src/app/constants/constant';
import { UtilityService } from 'src/app/services/utility.service';
import { TranslateService } from 'src/app/services/translate.service';
import { VALIDATION_CRITERIA } from 'src/app/constants/validation-criteria';

@Component({
  selector: 'app-steps-one',
  templateUrl: './steps-one.component.html',
  styleUrls: ['./steps-one.component.scss'],
})
export class StepsOneComponent implements OnInit {
  @ViewChild('logoInput') logoInputRef: ElementRef<any>;
  @ViewChild('companyPhotoInput') companyPhotoInputRef: ElementRef<any>;
  @Output() stepOneData = new EventEmitter();
  firstStepForm: FormGroup;
  companyLogoUrl: string;
  companyPhotoUrl: string;
  companyLogoFile: any;
  companyPhotoFile: any;
  docType = DOC_TYPE;
  infoType = INFORMATION_TYPE;

  LIMIT = VALIDATION_CRITERIA;

  constructor(
    private _uploadService: FileUploadService,
    private _setupService: ProfileSetupService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.firstStepForm = this._setupService.firstStepForm;
    this.companyLogoUrl = this._setupService.companyLogoUrl;
    this.companyPhotoUrl = this._setupService.companyPhotoUrl;
    // this.firstStepForm.valueChanges.subscribe((data) => {
    //   console.log(this.firstStepForm);
    // });
  }

  get firstStepStatus() {
    return this.firstStepForm.valid && !!this.companyLogoUrl;
  }

  // This will retun data string formate
  getUnReferenced(data) {
    return JSON.parse(JSON.stringify(data));
  }

  // This will logo change
  async onLogoChange(fileEvent: any, type: number) {
    try {
      let result = await onSelectFile(event, IMAGE_FORMAT, 1);
      console.log(result);

      this.onSetFileUrl(true, result[0], type);
      this.logoInputRef.nativeElement.file = null;
    } catch (error) {
      console.log('eroror', error);
      this.logoInputRef.nativeElement.file = null;

      if (error && error.type === CUSTOM_HANDLE_ERROR.FILE_TYPE) {
        this._utlityService.showAlert(DOCUMENT_FORMAT_ERROR(IMAGE_FORMAT));
      }
      if (error && error.type === CUSTOM_HANDLE_ERROR.FILE_SIZE) {
        this._utlityService.showAlert(MAX_SIZE_ERROR(1));
      }
      this.logoInputRef.nativeElement.file = null;
    }
  }

  // This will change company photo chnage
  async onCompanyPhotoChange(fileEvent: any, type: number) {
    try {
      let result = await onSelectFile(event, IMAGE_FORMAT, 2);
      this.onSetCompanyFileUrl(true, result[0], type);
      this.companyPhotoInputRef.nativeElement.file = null;
    } catch (error) {
      if (error && error.type === CUSTOM_HANDLE_ERROR.FILE_TYPE) {
        this._utlityService.showAlert(DOCUMENT_FORMAT_ERROR(IMAGE_FORMAT));
      }
      if (error && error.type === CUSTOM_HANDLE_ERROR.FILE_SIZE) {
        this._utlityService.showAlert(MAX_SIZE_ERROR(2));
      }
      this.companyPhotoInputRef.nativeElement.file = null;

      console.log('eroror', error);
    }
  }

  // This will set file url
  onSetFileUrl(flag: boolean, result: any, type: number) {
    switch (type) {
      case DOC_TYPE.LOGO:
        if (flag) {
          this.companyLogoUrl = result['url'];
          this.companyLogoFile = result['file'];
        } else {
          this.logoInputRef.nativeElement.value = '';
        }
        return;
      default:
        return;
    }
  }

  // This will set company file url
  onSetCompanyFileUrl(flag: boolean, result: any, type: number) {
    switch (type) {
      case DOC_TYPE.LOGO:
        if (flag) {
          this.companyPhotoUrl = result['url'];
          this.companyPhotoFile = result['file'];
        } else {
          this.companyPhotoInputRef.nativeElement.value = '';
        }
        return;
      default:
        return;
    }
  }

  // This will submit form data
  async onFirstStepSubmit() {
    if (this.firstStepForm.invalid) {
      return;
    }
    const data = this.getUnReferenced(this.firstStepForm.value);
    try {
      if (this.companyLogoFile) {
        const logoFile = await this._uploadService.uploadFile(
          this.companyLogoFile
        );
        this.companyLogoUrl = logoFile['Location'];
        this.companyLogoFile = '';
      } else if (!this.companyLogoUrl) {
        return;
      }
      if (this.companyPhotoFile) {
        const logoFile = await this._uploadService.uploadFile(
          this.companyPhotoFile
        );
        this.companyPhotoUrl = logoFile['Location'];
        this.companyPhotoFile = '';
        data['companyPhoto'] = this.companyPhotoUrl;
        this._setupService.companyPhotoUrl = this.companyPhotoUrl;
      }

      data['companyLogo'] = this.companyLogoUrl;
      this._setupService.companyLogoUrl = this.companyLogoUrl;
      this.stepOneData.emit({ companyDetails: data, profileSteps: 1 });
    } catch (error) {
      // console.log("error occurs");
    }
  }

  // This will delete Company Photo
  deleteCompanyPhoto() {
    this.companyPhotoFile = null;
    this.companyPhotoUrl = null;
    this.firstStepForm.get('companyPhoto').setValue('');
  }

  // This will delete Company Logo
  deleteCompanyLogo() {
    this.companyLogoFile = null;
    this.companyLogoUrl = null;
    this.firstStepForm.get('companyLogo').setValue('');
  }
}
