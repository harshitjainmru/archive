import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { TOAST_MESSAGE } from "src/app/constants/constant";
import { DROPDOWN_TYPE } from "src/app/constants/enums";
import { FormUtils } from "src/app/constants/form.util";
import { JOB_AREA } from "src/app/constants/urls";
import { VALIDATION_CRITERIA } from "src/app/constants/validation-criteria";
import { UtilityService } from "src/app/services/utility.service";
import { JobService } from "../../add-job/service/job.service";

@Component({
  selector: "app-add-address",
  templateUrl: "./add-address.component.html",
  styleUrls: ["./add-address.component.scss"],
})
export class AddAddressComponent implements OnInit {
  addAddressForm: FormGroup;
  isLoader: boolean = false;
  LIMIT = VALIDATION_CRITERIA;
  jobareaType = DROPDOWN_TYPE.JOBAREA;
  jobareaSearchUrl = JOB_AREA;
  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private utilityService: UtilityService,
    public dialogRef: MatDialogRef<AddAddressComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.addAddressForm = this.fb.group({
      jobAreaId: ["", [Validators.required]],
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(this.LIMIT.nameMinLength),
          Validators.maxLength(this.LIMIT.nameMaxLength),
        ],
      ],
      addressLine: [
        "",
        [
          Validators.required,
          Validators.minLength(this.LIMIT.addressMinLength),
          Validators.maxLength(this.LIMIT.addressMaxLength),
        ],
      ],
      cityName: [
        "",
        [
          // Validators.required,
          Validators.minLength(this.LIMIT.nameMinLength),
          Validators.maxLength(this.LIMIT.nameMaxLength),
        ],
      ],
      zipcode: [
        "",
        [
          // Validators.required,
          Validators.minLength(this.LIMIT.zipcodeMinLength),
          Validators.maxLength(this.LIMIT.zipcodeMaxLength),
        ],
      ],
      // latitude: ['41.40338'],
      // longitude: ['2.17403'],
    });
  }

  get f() {
    return this.addAddressForm.controls;
  }

  onSubmit() {
    if (this.addAddressForm.invalid) {
      return;
    }
    this.addAddressForm.disable();
    this.isLoader = true;
    const formData = this.addAddressForm.value;
    formData["jobAreaId"] = formData.jobAreaId._id;
    const payload = { ...this.addAddressForm.value };

    this.jobService.addAddress(FormUtils.parse(payload)).then(
      (response) => {
        this.utilityService.showAlert(TOAST_MESSAGE.ADDRESS_CREATED);
        this.dialogRef.close(response.data);
        this.isLoader = false;
      },
      (error) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }
}
