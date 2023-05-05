import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import {
  CLIENT_PROFILE_STATUS,
  CUSTOM_HANDLE_ERROR,
  DOC_TYPE,
  INFORMATION_TYPE,
  SUCCESS_PARENT_TYPE,
} from "src/app/constants/enums";
import { onSelectFile } from "src/app/constants/file-input";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { FileUploadService } from "src/app/services/file-upload.service";
import { SuccessPopupComponent } from "src/app/modules/common/modules/success-popup/success-popup.component";
import { VALIDATION_CRITERIA } from "src/app/constants/validation-criteria";
import {
  IMAGE_FORMAT,
  DOCUMENT_FORMAT_ERROR,
  MAX_SIZE_ERROR,
} from "src/app/constants/constant";
import { UtilityService } from "src/app/services/utility.service";
import { UserProfileService } from "src/app/services/user-profile.service";
import { UserProfile } from "src/app/models/common.interface";
import { CompanyDetailsSuccessPopupComponent } from "../../success-popup/success-popup.component";
import { FormUtils } from "src/app/constants/form.util";

@Component({
  selector: "app-edit-company-profile",
  templateUrl: "./edit-company-profile.component.html",
  styleUrls: ["./edit-company-profile.component.scss"],
})
export class EditCompanyProfileComponent implements OnInit, OnDestroy {
  @ViewChild("logoInput") logoInputRef: ElementRef<any>;
  @ViewChild("companyPhotoInput") companyPhotoInputRef: ElementRef<any>;
  firstStepForm: FormGroup;
  companyLogoUrl: string;
  companyPhotoUrl: string;
  companyLogoFile: any;
  companyPhotoFile: any;
  docType = DOC_TYPE;
  infoType = INFORMATION_TYPE;
  profile: any;
  LIMIT = VALIDATION_CRITERIA;
  clientStatus = CLIENT_PROFILE_STATUS;

  constructor(
    public dialogRef: MatDialogRef<EditCompanyProfileComponent>,
    private _profileSetupService: ProfileSetupService,
    private dialog: MatDialog,
    private _uploadService: FileUploadService,
    private _setupService: ProfileSetupService,
    private _utlityService: UtilityService,
    private userProfileService: UserProfileService
  ) {
    // this.initForm();
  }
  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.firstStepForm = this._setupService.firstStepForm;
    this.companyLogoUrl = this._setupService.companyLogoUrl;
    this.companyPhotoUrl = this._setupService.companyPhotoUrl;
    this.patchData();
  }
  patchData() {
    const profileDetail: UserProfile = this.userProfileService.profileData;
    this.profile = profileDetail;
    this.companyLogoUrl = profileDetail.companyDetails.companyLogo;
    this.companyPhotoUrl =
      profileDetail.companyDetails.companyPhoto == "null"
        ? null
        : profileDetail.companyDetails.companyPhoto;
    this.firstStepForm.patchValue(profileDetail.companyDetails);
  }
  async onLogoChange(fileEvent: any, type: number) {
    try {
      let result = await onSelectFile(event, IMAGE_FORMAT, 1);
      console.log(result);

      this.onSetFileUrl(true, result[0], type);
      this.logoInputRef.nativeElement.file = null;
    } catch (error) {
      console.log("eroror", error);
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

      console.log("eroror", error);
    }
  }

  onSetFileUrl(flag: boolean, result: any, type: number) {
    switch (type) {
      case DOC_TYPE.LOGO:
        if (flag) {
          this.companyLogoUrl = result["url"];
          this.companyLogoFile = result["file"];
        } else {
          this.logoInputRef.nativeElement.value = "";
        }
        return;
      default:
        return;
    }
  }

  onSetCompanyFileUrl(flag: boolean, result: any, type: number) {
    switch (type) {
      case DOC_TYPE.LOGO:
        if (flag) {
          this.companyPhotoUrl = result["url"];
          this.companyPhotoFile = result["file"];
        } else {
          this.companyPhotoInputRef.nativeElement.value = "";
        }
        return;
      default:
        return;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUnReferenced(data) {
    return JSON.parse(JSON.stringify(data));
  }

  onSucessDialog() {
    let dialogRef = this.dialog.open(SuccessPopupComponent, {
      width: "410px",
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: SUCCESS_PARENT_TYPE.COMPANY_PROFILE,
    });
  }

  updateProfileCriteria(reqData) {
    this._profileSetupService
      .updateCompanyDetailsRequest(reqData)
      .then(({ data }) => {
        this.dialogRef.close(data);
        this.onSucessDialog();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  get firstStepStatus() {
    return this.firstStepForm.valid && !!this.companyLogoUrl;
  }

  getFileType(url: string) {
    const type = url.split(":");
    if (type[0] == "data") {
      const docType = type[1].split("/")[0];
      if (docType == "application") {
        return "pdf";
      } else {
        return "image";
      }
    } else {
      const uploadedUrl = url.split(".");
      const docType = uploadedUrl[uploadedUrl.length - 1];
      if (docType == "pdf") {
        return "pdf";
      } else {
        return "image";
      }
    }
  }

  async updateDetails() {
    if (!this.firstStepForm.valid) {
      return;
    }

    let data = { ...this.firstStepForm.value };
    // data = FormUtils.parse(data);
    if (this.companyLogoFile) {
      const logoFile = await this._uploadService.uploadFile(
        this.companyLogoFile
      );
      this.companyLogoUrl = logoFile["Location"];
      this.companyLogoFile = "";
      data["companyLogo"] = this.companyLogoUrl;
      this._setupService.companyLogoUrl = this.companyLogoUrl;
    }
    if (this.companyPhotoFile) {
      const logoFile = await this._uploadService.uploadFile(
        this.companyPhotoFile
      );
      this.companyPhotoUrl = logoFile["Location"];
      this.companyPhotoFile = "";
      data["companyPhoto"] = this.companyPhotoUrl;
      this._setupService.companyPhotoUrl = this.companyPhotoUrl;
    }
    if (this.profile?.profileStatus == this.clientStatus.VERIFIED) {
      delete data.companyName;
      delete data.tradingName;

      delete data.uenNumber;
    }
    if (!data.companyWebsite) {
      delete data.companyWebsite;
    }
    const res = await this._setupService.updateCompanyDetailsRequest({
      companyDetails: data,
      steps: 1,
    });
    this.profile = res.data;
    this.dialogRef.close(this.profile);
    if (this.profile?.profileStatus !== this.clientStatus.VERIFIED) {
      this.dialog
        .open(CompanyDetailsSuccessPopupComponent, {
          width: "410px",
          autoFocus: false,
          disableClose: true,
          restoreFocus: false,
        })
        .afterClosed()
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
  deleteCompanyPhoto() {
    this.companyPhotoFile = null;
    this.companyPhotoUrl = null;
    this.firstStepForm.get("companyPhoto").setValue("");
  }

  deleteCompanyLogo() {
    this.companyLogoFile = null;
    this.companyLogoUrl = null;
    this.firstStepForm.get("companyLogo").setValue("");
  }
}
