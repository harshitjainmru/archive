import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ICountry } from '../models/common.interface';
import { CountrySelectionComponent } from '../modules/common/components/country-selection/country-selection.component';

@Injectable()
export class CountryService {
  constructor(private _dialog: MatDialog) {}

  // This will open CountrySelectionComponent in dialog
  openCountryDialog(): Observable<any> {
    const dialogRef = this._dialog.open(CountrySelectionComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((country) => {
      if (country) {
        this.setCountry(country);
      }
    });
    return dialogRef.afterClosed();
  }

  // Set  data in local storage with country key
  setCountry(data) {
    localStorage.setItem('country', JSON.stringify(data));
  }

  // This will get country key value from local storage
  get currentCountry(): ICountry {
    return JSON.parse(localStorage.getItem('country'));
  }

  // This will get payload when currentCountry
  get countryPayload() {
    if (this.currentCountry) {
      return {
        countryName: this.currentCountry.name,
        countryId: this.currentCountry._id,
      };
    } else {
      return {};
    }
  }

  // This will get countryId when currentCountry
  get countryId() {
    if (this.currentCountry) {
      return { countryId: this.currentCountry._id };
    } else {
      return {};
    }
  }
}
