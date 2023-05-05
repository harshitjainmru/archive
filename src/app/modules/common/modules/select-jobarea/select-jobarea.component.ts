import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as EventEmitter from 'events';
import { JobService } from 'src/app/modules/features/job/add-job/service/job.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { DROPDOWN_TYPE } from 'src/app/constants/enums';

@Component({
  selector: 'app-select-jobarea',
  templateUrl: './select-jobarea.component.html',
  styleUrls: ['./select-jobarea.component.scss'],
})
export class SelectJobareaComponent implements OnInit {
  private _filterOptions: {
    page: number;
    limit: number;
    search: string;
    countryId?: string;
    status?: number;
  } = {
    page: 1,
    limit: 20,
    search: '',
  };
  selectedgetDataList: any = [];
  jobArea: any = [];
  @Input() controls: FormControl = new FormControl();
  @Output() selectedItem = new EventEmitter();
  @Input() type;
  @Input() preSelected: any = null;
  @Input() searchUrl;
  @Input() validateKey = 'JOB_AREA';
  @Input() placeholder = 'Search address ...';
  @Input() selectPlaceholder = 'Search & select or create new';

  isLoader: boolean = false;
  public isSearch: boolean = false;
  // -------- INFINITE SCROLL --------
  @ViewChild('selectElem', { static: true }) selectElem: any;
  private readonly PIXEL_TOLERANCE = 3.0;
  viewIndex = 0;
  windowSize = 10;
  nextHit = false;
  // -------- END INFINITE SCROLL --------
  constructor(
    private addJobService: JobService,
    private dialog: MatDialog,
    private userProfileService: UserProfileService
  ) {}

  // On init life cycle hook
  ngOnInit(): void {
    if (this.preSelected) {
      this.jobArea.push(this.preSelected);
      console.log(this.jobArea);
    }
    this.getDataList();
  }

  // After View init life cycle hook
  ngAfterViewInit() {
    this.selectElem.openedChange.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  // This will use for dropdown state,city,jobarea
  getDataList() {
    this.isLoader = !this.isLoader;
    let query = { ...this._filterOptions };
    let extendName = 'name';

    switch (this.type) {
      case DROPDOWN_TYPE.STATE:
        query = {
          ...query,
          countryId: this.userProfileService.profileData.countryId,
        };
        break;
      case DROPDOWN_TYPE.CITY:
        query = {
          ...query,
          countryId: this.userProfileService.profileData.countryId,
        };
        extendName = 'cityName';
        break;
      case DROPDOWN_TYPE.JOBAREA:
        query = {
          ...query,
          countryId: this.userProfileService.profileData.countryId,
        };
        break;

      case DROPDOWN_TYPE.BUSINESS_CATEGORY:
        query = { ...query };
        break;

      case DROPDOWN_TYPE.JOBNAME:
        query = { ...query, status: 1 };
        extendName = 'title';
        break;
      default:
        query = { ...query };
    }
    this.addJobService
      .searchList(this.searchUrl, query)
      .then(({ data: { result, next } }) => {
        this.nextHit = next;
        this.isLoader = !this.isLoader;
        if (!this.jobArea) {
          this.jobArea = result;
        } else {
          this.jobArea.push(
            ...result.map((item) => {
              return {
                ...item,
                name: item[extendName],
              };
            })
          );
          // this.setExistingData(this.controls.value); // ONLY FOR SET EXISTING SELECT DATA
        }
      });
  }

  // ////   SEARCHING  ////////////
  searchAreas(text: string) {
    text ? (this.isSearch = true) : (this.isSearch = false);
    this.jobArea = [];
    this._filterOptions.search = text;
    this._filterOptions.page = 1;
    this.getDataList();
  }

  // // FETCH MORE DATA ON SCROLL DOWN ////////////
  getNextBatch() {
    if (!this.nextHit) {
      return;
    }
    ++this._filterOptions.page;
    this.getDataList();
  }

  // ////////// INFINITE SCROLL  ////////////

  registerPanelScrollEvent() {
    setTimeout(() => {
      if (this.selectElem && this.selectElem.panel) {
        const panel = this.selectElem.panel.nativeElement;
        panel.addEventListener('scroll', (event) =>
          this.loadNextOnScroll(event)
        );
      }
    }, 0);
  }

  loadNextOnScroll(event) {
    if (this.hasScrolledToBottom(event.target)) {
      this.viewIndex += this.windowSize;
      this.getNextBatch();
    }
  }

  private hasScrolledToBottom(target): boolean {
    return (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      this.PIXEL_TOLERANCE
    );
  }

  compareObjectIds(o1: any, o2: any): boolean {
    if (o1 && o2) {
      if (o1.cityId && o2.cityId) {
        return o1.cityId === o2.cityId;
      } else if (typeof o2 === 'string') {
        return o1._id === o2;
      } else {
        return o1._id === o2._id;
      }
    } else {
      return false;
    }
  }

  // ////////// INFINITE SCROLL  ////////////
}
