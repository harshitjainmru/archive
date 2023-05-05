import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICountry } from 'src/app/models/common.interface';
import { CountryService } from 'src/app/services/country.service';
import { AccountService } from './account.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  currentCountry: ICountry;
  profileSetupSub: Subscription;
  isPSetup: boolean = false;
  constructor(
    private accountService: AccountService,
    private utilService: UtilityService
  ) {
    this.profileSetupSub = this.accountService.isProfileSetup.subscribe(
      (flag) => {
        this.isPSetup = flag;
      }
    );
  }

  ngOnInit(): void {
    this.currentCountry = this.utilService.currentCountry;
    this.utilService.countryCode.next(this.currentCountry.countryCode);
  }

  // This will open  dialog with CountrySelectionComponent
  onOpenDialog() {
    this.utilService.openCountryDialog().subscribe((country: any) => {
      if (country) {
        this.currentCountry = country;
      }
    });
  }

  //This will use for unsubscribe
  ngOnDestroy() {
    this.profileSetupSub.unsubscribe();
  }
}
