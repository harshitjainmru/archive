import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICountry } from 'src/app/models/common.interface';
import { environment } from 'src/environments/environment';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.component.html',
  styleUrls: ['./country-selection.component.scss'],
})
export class CountrySelectionComponent implements OnInit {
  countryLists: Array<ICountry> = [];

  selectedCountry: ICountry;
  constructor(
    private dialogRef: MatDialogRef<CountrySelectionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.countryLists = TranslateService.staticCountryIds;
    this.selectedCountry = this.currentCountry;
  }

  // This will select country
  onCountrySelection(country) {
    this.selectedCountry = country;
  }

  // This will send select country data on close dialog
  onSubmit() {
    if (this.selectedCountry) {
      this.dialogRef.close(this.selectedCountry);
    }
  }

  // This will close contry selection dialog
  onClose() {
    this.dialogRef.close(null);
  }

  // This will get current country
  get currentCountry(): ICountry {
    return JSON.parse(localStorage.getItem('country'));
  }
}
