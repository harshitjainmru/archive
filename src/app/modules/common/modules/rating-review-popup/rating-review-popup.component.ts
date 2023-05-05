import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VALIDATION_CRITERIA } from 'src/app/constants/validation-criteria';
import { ApplicantService } from 'src/app/modules/features/job/applicant/applicant.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-rating-review-popup',
  templateUrl: './rating-review-popup.component.html',
  styleUrls: ['./rating-review-popup.component.scss'],
})
export class RatingReviewPopupComponent implements OnInit {
  ratingForm: FormGroup;
  STAR_RATING_OPTIONS = [1, 2, 3, 4, 5];
  options = [];
  descriptionArr = [
    'Good behaviour',
    'Meet Expectations',
    'Punctual',

    'Hard working',

    'Good work ethics',
  ];
  VALIDATION_CRITERIA = VALIDATION_CRITERIA;

  constructor(
    public dialogRef: MatDialogRef<RatingReviewPopupComponent>,
    private fb: FormBuilder,
    private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public data: { jobDetails: any; applicant: any },
    private applicantService: ApplicantService
  ) {
    this.ratingForm = this.createRatingForm();
    console.log(data);
    if (this.data.applicant.rating) {
      this.ratingForm.patchValue(this.data.applicant.rating);
      this.options = [...this.data.applicant.rating.options];
    }
  }

  ngOnInit(): void {}

  // This will close dialg
  closeDialog() {
    this.dialogRef.close();
  }

  // This will get rating control
  get ratingControl() {
    return this.ratingForm.controls['rating'];
  }

  // Create ratingForm
  createRatingForm() {
    return (this.ratingForm = this.fb.group({
      rating: [null, [Validators.required]],
      experience: this.formService.getControl('ratingDescription'),
    }));
  }

  // This will handle checked box
  handleCheckboxChange(event: MatCheckboxChange, item) {
    if (event.checked) {
      this.options.push(item);
    } else {
      this.options = [
        ...this.options.filter((existingItem) => existingItem != item),
      ];
    }

    console.log(this.options);
  }

  // This will submit rating form
  async submitRating() {
    if (this.data.applicant.rating) {
      const payload = {
        ...this.ratingForm.value,
        options: [...this.options],
        ratingId: this.data.applicant.rating._id,
      };
      console.log(payload);

      const res = await this.applicantService.rateCandidate(payload, true);
      this.dialogRef.close(true);
    } else {
      const payload = {
        ...this.ratingForm.value,
        userId: this.data.applicant.applicant._id,
        options: [...this.options],
        jobId: this.data.jobDetails._id,
      };
      console.log(payload);

      const res = await this.applicantService.rateCandidate(payload);
      this.dialogRef.close(true);
    }
  }

  // This will check checked item
  checkChecked(item) {
    const idx = this.options.findIndex((option) => option == item);
    console.log(idx);

    return idx >= 0;
  }
}
