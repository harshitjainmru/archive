import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CLIENT_PROFILE_STATUS } from "src/app/constants/enums";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { UserProfileService } from "src/app/services/user-profile.service";
import { EditCompanyAddressComponent } from "../company-details/edit-company-address/edit-company-address.component";
import { EditCompanyDocumentsComponent } from "../company-details/edit-company-documents/edit-company-documents.component";
import { EditCompanyProfileComponent } from "../company-details/edit-company-profile/edit-company-profile.component";
import { EditUserProfileComponent } from "../edit-user-profile/edit-user-profile.component";
import { CompanyDetailsSuccessPopupComponent } from "../success-popup/success-popup.component";
import { CreateRequestComponent } from "../request-module/create-request/create-request.component";
import { RequestDetailsComponent } from "../request-module/request-details/request-details.component";
import { Gallery, ImageItem, ImageSize, ThumbnailsPosition } from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileDetail;
  documents = [];
  clientStatus = CLIENT_PROFILE_STATUS;
  constructor(
    public dialog: MatDialog,
    private _userProfileService: UserProfileService,
    private _setupService: ProfileSetupService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) {
    // this.clientStatus.VERIFIED
    this.getProfileDetail();
  }

  ngOnInit(): void {
    // Load items into the lightbox gallery ref
    this.dialog.closeAll()
  }

  openPreview(src) {
    const lightboxRef = this.gallery.ref("lightbox");

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
      disableThumb: true,
      thumbHeight: 0,
      counter: false,
    });
    lightboxRef.load([new ImageItem({ src: src, thumb: src })]);
    this.lightbox.open(0);
  }

  getProfileDetail(refresh = false) {
    this._userProfileService.getProfileDetail(refresh).then((data) => {
      this.profileDetail = data;
      this._userProfileService.listenProfile.next(data);
      this.documents = [];
      this.profileDetail.verifiedDocumentUrl.forEach((element: string) => {
        const singleImageGroup = this._setupService.createfileGroup();
        const type = element.split(".");
        const fileName = `${type[type.length - 2].split("/")[1]}.${
          type[type.length - 1]
        }`;
        singleImageGroup.patchValue({
          url: element,
          file: null,
          name: fileName,
          type: type[type.length - 1],
        });
        this.documents.push(singleImageGroup.value);
      });
    });
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

  openUseredit(): void {
    const dialogRef = this.dialog.open(EditUserProfileComponent, {
      data: this.profileDetail,
      panelClass: "user_otp_popup",
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.getProfileDetail(true);

        // this.profileDetail = resp.data;
      }
    });
  }

  updateProfile(data) {}

  openEditcompany(): void {
    const dialogRef = this.dialog.open(EditCompanyProfileComponent, {
      data: this.profileDetail,
      width: "700px",
      autoFocus: false,
      disableClose: true,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.profileDetail = resp;
        this._userProfileService.profileData = resp;
        this._userProfileService.listenProfile.next(resp);
      }
    });
  }
  openAddress(): void {
    const dialogRef = this.dialog.open(EditCompanyAddressComponent, {
      width: "700px",
      autoFocus: false,
      disableClose: true,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.profileDetail = resp;
        this._userProfileService.profileData = resp;
      }
    });
  }
  openCategoryDocument(): void {
    const dialogRef = this.dialog.open(EditCompanyDocumentsComponent, {
      width: "700px",
      autoFocus: false,
      disableClose: true,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.documents = [];
        this.profileDetail = resp;
        this._userProfileService.profileData = resp;
        this.profileDetail.verifiedDocumentUrl.forEach((element: string) => {
          const singleImageGroup = this._setupService.createfileGroup();
          const type = element.split(".");
          const fileName = element.split("/")[element.split("/").length - 1];
          singleImageGroup.patchValue({
            url: element,
            file: null,
            name: fileName,
            type: type[type.length - 1],
          });
          this.documents.push(singleImageGroup.value);

          // this.docsFormArray.push(singleImageGroup);
        });
      }
    });
  }

  openSuccessPopup(): void {
    const dialogRef = this.dialog.open(CompanyDetailsSuccessPopupComponent, {
      width: "410px",
      autoFocus: false,
      disableClose: true,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.getProfileDetail(true);
      }
    });
  }

  openUrl(item) {
    const { url } = item;
    window.open(url);
    return;
  }
}
