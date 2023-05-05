import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  DOCUMENT_FORMAT,
  DOCUMENT_FORMAT_ERROR,
  MAX_SIZE_ERROR,
} from "src/app/constants/constant";
import {
  CLIENT_PROFILE_STATUS,
  CUSTOM_HANDLE_ERROR,
  DOC_TYPE,
  DROPDOWN_TYPE,
} from "src/app/constants/enums";
import { onSelectFile } from "src/app/constants/file-input";
import { ACCOUNT_API_GROUP } from "src/app/constants/urls";
import {
  ISearchAutocomplete,
  UserProfile,
} from "src/app/models/common.interface";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { FileUploadService } from "src/app/services/file-upload.service";
import { LoaderService } from "src/app/services/loader.service";
import { UserProfileService } from "src/app/services/user-profile.service";
import { UtilityService } from "src/app/services/utility.service";
import { CompanyDetailsSuccessPopupComponent } from "../../success-popup/success-popup.component";

@Component({
  selector: "app-edit-company-documents",
  templateUrl: "./edit-company-documents.component.html",
  styleUrls: ["./edit-company-documents.component.scss"],
})
export class EditCompanyDocumentsComponent implements OnInit, OnDestroy {
  thirdStepForm: FormGroup;
  companyDocUrl: string;
  companyCertUrl: any[] = [];
  companyDocFile: any;
  companyCertFile: any;
  searchValue = new FormControl([""]);
  categoryData: any = [];
  docType = DOC_TYPE;
  searchBusinessUrl = ACCOUNT_API_GROUP.BUSINESS_CATEGORY;
  stateType = DROPDOWN_TYPE.BUSINESS_CATEGORY;
  docsArray: Array<any> = [];
  clientStatus = CLIENT_PROFILE_STATUS;
  profile;

  businessCategoriesConfig: ISearchAutocomplete = {
    url: ACCOUNT_API_GROUP.BUSINESS_CATEGORY,
    isPagination: true,
    // control:this.userFilterForm.get('jobArea') as FormControl,
    viewKey: "name",
    valueKey: "_id",
    selectedValue: [],
    selectedViewValue: [],
    placeholder: "Search by Category",
    localSave: true,
    localSaveKey: "BUSINESS_CATEGORIES",
    limit: 1,
  };
  documentFormats = DOCUMENT_FORMAT;
  documents = [];

  @ViewChild("inputSelection") inputSelection: ElementRef;
  constructor(
    private _uploadService: FileUploadService,
    private _setupService: ProfileSetupService,
    private _utilityService: UtilityService,
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    private dialogRef: MatDialogRef<EditCompanyDocumentsComponent>,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this._utilityService.clearFormArray(this.docsFormArray);
  }

  ngOnInit(): void {
    this.thirdStepForm = this._setupService.thirdStepForm;
    this.companyCertUrl = this._setupService.companyCertUrl;

    const profileDetail: UserProfile = this.userProfileService.profileData;
    this.profile = profileDetail;

    this.thirdStepForm.patchValue({
      businessCategories: {
        _id: profileDetail.businessCategories[0]._id,
        name: profileDetail.businessCategories[0].name,
      },
    });

    profileDetail.verifiedDocumentUrl.forEach((element: string) => {
      const singleImageGroup = this._setupService.createfileGroup();
      const type = element.split(".");
      const fileName = element.split("/")[element.split("/").length-1];
      singleImageGroup.patchValue({
        url: element,
        file: null,
        name: fileName,
        type: type[type.length - 1],
      });
      this.documents.push(singleImageGroup.value);



      this.docsFormArray.push(singleImageGroup);
    });

    this.companyCertUrl = [...this.documents]
    
  }

  /**
   * Getter for documents as FormArray
   */
  get docsFormArray() {
    return this.thirdStepForm.get("verifiedDocumentUrl") as FormArray;
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
      this._utilityService.showAlert("Cannot select more than 5 documents");

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

  close() {
    // console.log(this.thirdStepForm ,this.companyCertUrl.length)
    this.dialogRef.close(false);
  }

  async updateDetails() {
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

      data["businessCategories"] = [
        {
          _id: data.businessCategories._id,
          name: data.businessCategories.name,
        },
      ];

      this.businessCategoriesConfig.selectedValue.map((item) => {
        return { _id: item._id, name: item.name };
      });

      data["verifiedDocumentUrl"] = data.verifiedDocumentUrl.map((img) =>
        img.url ? img.url : img
      );

      // data['businessCategories'] = this.selectedCategories;
      this._setupService.companyCertUrl = [...this.documents];
      data["steps"] = 3;
        const res = await this._setupService.updateCompanyDetailsRequest({
          ...data,
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
            });
        }
    } catch (err) {}
  }

  openUrl(item) {
    const { value } = item;
    window.open(value.url);
    return;
  }
}
