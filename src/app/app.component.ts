import { Component } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './modules/common/modules/firebase/firebase.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { LoaderService } from './services/loader.service';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loaderCount = 0;
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private utility: UtilityService,
    private fireBaseMsgService: FirebaseService,
    private googleAnalytic: GoogleAnalyticsService
  ) {
    this.fireBaseMsgService.requestPermission()
    this.fireBaseMsgService.receiveMessage()
    googleAnalytic.init();
    
    // this.message = this.fireBaseMsgService.currentMessage
  }

  ngOnInit() {
    // this.fetchCountry();
    
    this.loaderService.loader.subscribe((state) => {
      setTimeout(() => {
        this.loaderCount = this.loaderCount + (state ? 1 : -1);
        this.loaderCount = this.loaderCount < 0 ? 0 : this.loaderCount;
      });
    });
    this.router.events.forEach((event) => {
      // debugger;
      if (event instanceof NavigationStart) {
        this.loaderService.loader.next(true);
      } else if (event instanceof NavigationEnd) {
        this.loaderService.activePath = event['urlAfterRedirects'];
        this.loaderService.loader.next(false);
        if (this.utility.getAuthToken()) {
          // this.notificationService.readSubject.next(true);
        }
      } else if (event instanceof NavigationError) {
        this.loaderService.loader.next(false);
      } else if (event instanceof NavigationCancel) {
        this.loaderService.loader.next(false);
      }
    });
  }

  fetchCountry() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${environment.mapAPIKey}`
          )
            .then((res) => res.json())
            .then((response) => {
              let data = response.results[0].address_components.find(
                (data) => data.types.indexOf("country") >= 0
              );
              console.log("User's Location Info: ");
              this.utility.countryCode.next(data.short_name);
            })
            .catch((status) => {
              console.error("Request failed.  Returned status of", status);
              this.utility.countryCode.next("SG");
            });
        },
        (error) => {
          console.error(error);
          this.utility.countryCode.next("SG");
        }
      );
    } catch (error) {
      console.error(error);
      this.utility.countryCode.next("SG");

    }
  }

}
