import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { type } from "os";
import { CONFIRM_MODAL_TYPE } from "src/app/constants/enums";
import { VALIDATION_CRITERIA } from "src/app/constants/validation-criteria";
import { IPopupData } from "src/app/models/popup";
import { AccountService } from "src/app/modules/account/account.service";
import { FormService } from "src/app/services/form.service";
import { TranslateService } from "src/app/services/translate.service";
import { UserProfileService } from "src/app/services/user-profile.service";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  selector: "app-delete-account",
  templateUrl: "./delete-account.component.html",
  styleUrls: ["./delete-account.component.scss"],
})
export class DeleteAccountComponent implements OnInit {
  deletionForm: FormGroup;
  errorType: string;
  currentHidePassword = true;
  errormsg: string = null;
  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
    private _accountService: AccountService,
    private _utility: UtilityService,
    private userService: UserProfileService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.deletionForm = this._formBuilder.group({
      password: this._formService.getControl("password"),
      reason: [
        "",
        [
          Validators.required,
          Validators.minLength(VALIDATION_CRITERIA.bioMinLength),
          Validators.maxLength(VALIDATION_CRITERIA.subjectMaxLength),
        ],
      ],
    });
  }

  submitForm() {
    if (!this.deletionForm.valid) {
      return;
    }
    const formValue = { ...this.deletionForm.value };
    this._accountService.confirmPassword({ password: formValue.password }).then(
      (res) => {
        if (res.statusCode == 200) {
          this.deleteAccount();
        }
      },
      (err) => {
        console.log("errr");
        this.deletionForm.controls.password.reset();
      }
    );
  }

  deleteAccount() {
    const formValue = { ...this.deletionForm.value };

    if (formValue.reason && formValue.reason.length) {
      let data: IPopupData = {
        message: TranslateService.data.ARE_YOU_SURE,
        showTextBox: true,
        textBoxType: CONFIRM_MODAL_TYPE.PARAGRAPH,
        textBoxpara:
          "If you delete your account this process cannot be undone.",
        hideConfirmButton: true,
        cancelButtonText: "Close",
        confirmButtonText: "Yes",
      };
      this._utility.openDialog(data).subscribe(async (resp) => {
        if (resp) {
          this._accountService
            .deleteAccount(
              formValue.reason ? { feedback: formValue.reason } : {}
            )
            .then(
              (res) => {
                if (res.statusCode == 200) {
                  this.userService.navigateToWelcome();
                }
              },
              (err) => {
                console.log("errr");
                this.deletionForm.controls.password.reset();
              }
            );
        }
      });
    } else {
      this._utility.errorAlert({
        error: { message: "Please provide a reason to delete your account" },
      });
    }
  }

  onCancel() {
    this.resetForm();
  }

  resetForm() {
    this.deletionForm.reset();
  }
}
