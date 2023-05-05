import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UtilityService } from "../services/utility.service";
import { UserProfileService } from "../services/user-profile.service";
import { LOGIN, PROFILE_SETUP, WELCOME } from "../constants/routes";

@Injectable()
export class FeatureGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _utilityService: UtilityService,
    private profileService: UserProfileService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._utilityService.getAuthToken()) {
      return this.getUserDetail();
    }
    return this.navigate();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this._utilityService.getAuthToken()) {
      return this.getUserDetail();
    }

    return this.navigate();
  }

  async getUserDetail() {
    try {
      const userDetail = await this.profileService.getProfileDetail();
      if (!userDetail["isProfileCompleted"]) {
        this._router.navigate([PROFILE_SETUP.fullUrl]);
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  navigate() {
    this._utilityService.clearStorage();
    this._router.navigate([WELCOME.fullUrl]);
    return false;
  }
}
