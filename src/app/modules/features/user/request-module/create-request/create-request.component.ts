import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  DOCUMENT_FORMAT,
  DOCUMENT_FORMAT_ERROR,
  IMAGE_VIDEO_FORMAT,
  MAX_SIZE_ERROR,
} from "src/app/constants/constant";
import { CUSTOM_HANDLE_ERROR } from "src/app/constants/enums";
import { onSelectFile } from "src/app/constants/file-input";
import { FileUploadService } from "src/app/services/file-upload.service";
import { FormService } from "src/app/services/form.service";
import { LoaderService } from "src/app/services/loader.service";
import { UtilityService } from "src/app/services/utility.service";
import { RequestService } from "../request.service";

@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.scss"],
})
export class CreateRequestComponent implements OnInit {
  requestForm: FormGroup;
  @ViewChild("inputSelection") inputSelection: ElementRef;
  documentFormats = IMAGE_VIDEO_FORMAT;

  documents = [];
  constructor(
    public dialogRef: MatDialogRef<CreateRequestComponent>,
    private fb: FormBuilder,
    private formService: FormService,
    private _utilityService: UtilityService,
    private fileService: FileUploadService,
    private loaderService: LoaderService,
    private requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.requestForm = this.createRequestForm();
    console.log(data);
  }

  ngOnInit(): void {}

  createRequestForm() {
    return this.fb.group({
      description: this.formService.getControl("subjectDescription"),
      subject: this.formService.getControl("subjectRequest"),
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  get formValid() {
    return this.requestForm.valid;
  }

  async onSelectDocument(event) {
    if (this.documents.length >= 3) {
      this._utilityService.showAlert("Cannot select more than 3 attachments");

      return;
    }
    try {
      let result = await onSelectFile(event, IMAGE_VIDEO_FORMAT, 5);
      for (let i = 0; i < result.length; i++) {
        const fileObj = {
          url: result[i].url,
          file: result[i].file,
          name: result[i].file.name,
          type: result[i].type,
        };
        this.documents.push(fileObj);
        console.log(fileObj);
      }

      this.inputSelection.nativeElement.value = null;
    } catch (err) {
      if (err.type === CUSTOM_HANDLE_ERROR.FILE_TYPE) {
        this._utilityService.showAlert(
          DOCUMENT_FORMAT_ERROR(IMAGE_VIDEO_FORMAT)
        );
      } else if (err.type === CUSTOM_HANDLE_ERROR.FILE_SIZE) {
        this._utilityService.showAlert(MAX_SIZE_ERROR(5));
      }
      this.inputSelection.nativeElement.value = null;
    }
  }

  openUrl(item) {
    const { value } = item;
    console.log(value);
    window.open(value.url);
    return;
  }
  /**
   * Removes index from form array
   * @param index number
   */
  remove(index) {
    this.documents.splice(index, 1);
  }

  async submitRequest() {
    if (this.documents.length) {
      for (let i = 0; i < this.documents.length; i++) {
        if (this.documents[i].file) {
          const uploadedResult: any = await this.fileService.uploadFile(
            this.documents[i].file
          );
          this.loaderService.loader.next(false);

          this.documents[i].url = uploadedResult.Location;
        }
      }
    }

    let payload = {
      ...this.requestForm.value,
      attachment: [...this.documents.map((item) => item.url)],
      createdBy: 1,
      type: 2,
    };
    if (this.data) {
      payload.type = 3;
      payload.reportId = this.data.applicant._id;
    }

    try {
      const res = await this.requestService.createRequest(payload);
      if (res) {
        this.dialogRef.close(true);
        this._utilityService.showAlert(res.message);
      }
    } catch (error) {}
  }
}
