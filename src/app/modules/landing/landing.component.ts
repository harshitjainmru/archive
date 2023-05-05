import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/models/common.interface';
import { CountryService } from 'src/app/services/country.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  currentCountry: ICountry;
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.currentCountry = this.countryService.currentCountry;
  }

  onOpenDialog() {
    console.log('opepepp')
    this.countryService.openCountryDialog().subscribe((country: any) => {
      if (country) {
        this.currentCountry = country
      }
    })
  }

}
