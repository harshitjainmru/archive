import { Component, OnDestroy, OnInit } from "@angular/core";
import { HomeService } from "src/app/modules/features/home/home.service";
import * as moment from "moment";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { DATE_FORMATS, PAGE_OPTION_LIMIT } from "src/app/constants/constant";
import { TIMESHEET_STATUS } from "src/app/constants/enums";
import { TIMESHEET_LIST } from "src/app/constants/routes";
import { Router } from "@angular/router";
import { UtilityService } from "src/app/services/utility.service";
import { fadeInUpAnimation } from "src/animations/fade-in-up.animation";

@Component({
  selector: "app-home-graph-view",
  templateUrl: "./home-graph-view.component.html",
  styleUrls: ["./home-graph-view.component.scss"],
  animations: [fadeInUpAnimation],
})
export class HomeGraphViewComponent implements OnInit, OnDestroy {
  dateControl: FormControl = new FormControl(moment());
  sub: Subscription = new Subscription();
  shifts: Array<any> = null;
  dFormat = DATE_FORMATS;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.getShiftData(this.date);
    this.subscribeToDateControl();
  }
  ngOnInit(): void {}

  subscribeToDateControl() {
    this.sub.add(
      this.dateControl.valueChanges.subscribe((newDate: any) => {
        console.log(newDate);

        this.getShiftData(newDate);
      })
    );
  }

  get date() {
    return this.dateControl.value;
  }

  async getShiftData(date: moment.Moment) {
    this.shifts = null;
    const res = await this.homeService.getScheduleData({
      customDate: moment(date).startOf("day").toISOString(),
      monthStartDate: moment(date).startOf("month").toISOString(),
    });
    if (Array.isArray(res.data)) {
      this.shifts = [...(res.data || [])];
    } else {
      this.shifts = [];
    }
  }

  nextDay() {
    console.log(this.dateControl);
    this.dateControl.setValue(
      new Date(moment(this.date).add(1, "day").toDate())
    );
  }
  previousDay() {
    this.dateControl.setValue(
      new Date(moment(this.date).subtract(1, "day").toDate())
    );
    console.log(this.dateControl);

    console.log(this.date);
  }

  viewTimeSheet(shiftsData) {
    if (shiftsData.startDate >= moment()) {
      this.utilityService.showAlert("Sorry! timesheet is not available");
      return;
    }
    this.router.navigate(
      [`${TIMESHEET_LIST.fullUrl}/${TIMESHEET_STATUS.UNAPPROVED}`],
      {
        queryParams: {
          ...this.utilityService.formatMomentData({
            type: TIMESHEET_STATUS.UNAPPROVED,
            fromDate: moment(shiftsData.startDate).startOf("day"),
            toDate: moment(shiftsData.endDate).endOf("day"),
            ...PAGE_OPTION_LIMIT(10),
          }),
        },
      }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
