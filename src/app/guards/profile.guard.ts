import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HOME, LOGIN, WELCOME } from '../constants/routes';
import { UserProfileService } from '../services/user-profile.service';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _utilityService: UtilityService,
    private profileService: UserProfileService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._utilityService.getAuthToken()) {
      return this.getUserDetail();
    }
    return this.navigate();
  }

  async getUserDetail() {
    try {
      const userDetail = await this.profileService.getProfileDetail();
      if (!userDetail['isProfileCompleted']) {
        return true;
      } else {
        this._router.navigate([HOME.path]);
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  navigate() {
    this._utilityService.clearStorage();
    // this._router.navigate([LOGIN.fullUrl]);
    this._router.navigate([WELCOME.fullUrl]);
    return false;
  }

}
