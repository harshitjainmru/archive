import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  CanLoad,
  Router,
  UrlSegment,
} from "@angular/router";
import { Observable } from "rxjs";
import { UtilityService } from "../services/utility.service";
import { HttpService } from "../services/http.service";
import { LOGIN } from "../constants/routes";
import { HOME } from "../constants/routes";
import { ACCOUNT_API_GROUP, STATIC_COUNTRY_ID } from "../constants/urls";
import { environment } from "src/environments/environment";
import { CountrySelectionComponent } from "../modules/common/components/country-selection/country-selection.component";
import { MatDialog } from "@angular/material/dialog";
import { LoaderService } from "../services/loader.service";
import { TranslateService } from "../services/translate.service";
import { COUTRY_STATIC_FLAG, USER_TYPE } from "../constants/enums";

@Injectable()
export class AccountGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private http: HttpService,
    private _dialog: MatDialog,
    private loaderService: LoaderService
  ) {}

  navigate() {
    this.router.navigate([HOME.path]);
    return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next.params);
    // debugger
    if(next?.params?.accountType==USER_TYPE.STAFF_WORKER){
      this.utilityService.clearStorage();
    }
    if (!this.utilityService.getAuthToken()) {
      // debugger
      let isSuccess=next.params.isSuccess;
      console.log(!isSuccess);
      // debugger
      // if(!isSuccess){
      //     this.utilityService.errorAlert("Link Expired!");
      //     // this.router.navigate([LOGIN.fullUrl]);
      //     return true;
      // }
      let token = next.params.token;

      if (token) {
        return this.validateResetPasswordToken(token,isSuccess);
      } else {
        if (!localStorage.getItem(environment.countryKey)) {
          this.loaderService.loader.next(false);
          return this.setDefaultCountry()
          // return this.openCountryDialog();
        } else {
          return true;
        }
      }
    }

    return this.navigate();
  }

  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log(segments);
    // debugger
    if(segments?.length>3 && segments[2]?.path=='2' ){
      this.utilityService.clearStorage();
    }
    if (!this.utilityService.getAuthToken()) {
      if (!localStorage.getItem(environment.countryKey)) {
        this.loaderService.loader.next(false);
        return true;
        // return this.openCountryDialog();
      } else {
        return true;
      }
    }

    return this.navigate();
  }

  validateResetPasswordToken(token,isSuccess) {
    return new Observable<boolean>((observer) => {
      // console.log(Boolean(isSuccess),"------")
      // debugger
      if(isSuccess==='false'){
        const err={error:{
          message:'Link Expired!'
        }}
        
        this.utilityService.errorAlert(err)
        this.router.navigate([LOGIN.fullUrl]);
        observer.next(false);
        observer.complete();
      }
      else
      {this.http.get(`${ACCOUNT_API_GROUP.VALIDATE_TOKEN}/${token}`).subscribe(
        (response) => {
          observer.next(true);
          observer.complete();
        },
        (err) => {
          this.router.navigate([LOGIN.fullUrl]);
          observer.next(false);
          observer.complete();
        }
      );
    }});
  }

  openCountryDialog() {
    return new Observable<boolean>((observer) => {
      const dialogRef = this._dialog.open(CountrySelectionComponent, {
        width: "500px",
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((country) => {
        if (country) {
          localStorage.setItem(environment.countryKey, JSON.stringify(country));
          this.utilityService.countryCode.next(country.countryCode);
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  setDefaultCountry(){
    return new Observable<boolean>((observer) => {
      const country=TranslateService.staticCountryIds.filter((item)=>item.flag === COUTRY_STATIC_FLAG.SINGAPORE)[0];
      console.log(country);
       if (country) {
        localStorage.setItem(environment.countryKey, JSON.stringify(country));
        this.utilityService.countryCode.next(country.countryCode);
        observer.next(true);
        observer.complete();
      }
      // if (country) {
      //   localStorage.setItem(environment.countryKey, JSON.stringify(country));
      //   this.utilityService.countryCode.next(country.countryCode);
      //   observer.next(true);
      //   observer.complete();
      // }
      // const dialogRef = this._dialog.open(CountrySelectionComponent, {
      //   width: "500px",
      //   disableClose: true,
      // });

      // dialogRef.afterClosed().subscribe((country) => {
      //   if (country) {
      //     localStorage.setItem(environment.countryKey, JSON.stringify(country));
      //     this.utilityService.countryCode.next(country.countryCode);
      //     observer.next(true);
      //     observer.complete();
      //   }
      // });
    });
  }
}
