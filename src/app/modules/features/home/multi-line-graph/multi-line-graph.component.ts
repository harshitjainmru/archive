import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Title
);

import { curveBumpX } from "d3-shape";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { WEEK_UPDATE } from "src/app/constants/enums";
import { IDateRange } from "src/app/models/common.interface";
import { WeeklyCalendarSelectorComponent } from "src/app/modules/common/modules/weekly-calendar-selector/weekly-calendar-selector.component";
import { HomeService } from "../home.service";

@Component({
  selector: "app-multi-line-graph",
  templateUrl: "./multi-line-graph.component.html",
  styleUrls: ["./multi-line-graph.component.scss"],
})
export class MultiLineGraphComponent implements OnInit {
  labels: Array<any> = ["oct 1", "oct 2", "oct 3", "oct 4"];
  @ViewChild("canvasElement") _canvasRef: ElementRef<HTMLCanvasElement>;
  chart: Chart = null;
  today = new Date();
  showLoader = false;
  sub: Subscription = new Subscription();
  dateRangeConfig: IDateRange;
  searchSortFilter: FormGroup;
  @ViewChild("weeklyCalendarRef")
  weeklyCalendarRef: WeeklyCalendarSelectorComponent;
  constructor(private homeService: HomeService, private fb: FormBuilder) {
    this.createSearchSortFilter();
    this.dateRangeConfig = {
      startDate: this.searchSortFilter.get("fromDate") as FormControl,
      endDate: this.searchSortFilter.get("toDate") as FormControl,
    };
  }

  async getChartData(startDate, endDate) {
    this.showLoader = true;
    const query = { weekStartDate: startDate, weekEndDate: endDate, type: 1 };
    const res = await this.homeService.getDashboardStats(query);
    console.log(res);
    if (res && res.data) {
      const labels = [];
      const hours = [];

      const employees = [];

      let startDate1 = moment(startDate).startOf("isoWeek").toDate();
      labels.push(new DatePipe("en-us").transform(startDate1, "EEE"));
      for (let index = 0; index < 6; index++) {
        startDate1 = moment(startDate1).add(1, "days").startOf("day").toDate();

        labels.push(new DatePipe("en-us").transform(startDate1, "EEE"));
      }

      if (res.data.totalLogs && res.data.totalLogs.length) {
        res.data.totalLogs.forEach((element) => {
          hours.push(element.countDaily);
        });
      } else {
        for (let index = 0; index < 7; index++) {
          hours.push(0);
        }
      }

      if (res.data.noOfApplicants && res.data.noOfApplicants.length) {
        res.data.noOfApplicants.forEach((element) => {
          employees.push(element.countDaily);
        });
      } else {
        for (let index = 0; index < 7; index++) {
          employees.push(0);
        }
      }

      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart(labels, hours, employees);
      this.showLoader = false;
    }
  }

  ngOnInit(): void {}
  createSearchSortFilter() {
    const currentStartWeek = moment(new Date()).startOf("isoWeek").toDate();
    const currentEndWeek = moment(new Date()).endOf("isoWeek").toDate();
    return (this.searchSortFilter = this.fb.group({
      fromDate: [moment(currentStartWeek).startOf("isoWeek").toDate()],
      toDate: [moment(currentEndWeek).endOf("isoWeek").toDate()],
    }));
  }
  ngAfterViewInit(): void {
    // this.createChart(this.labels, [10, 15, 30, 19], [4, 3, 2, 1]);
    this.getChartData(
      moment(new Date()).startOf("isoWeek").toDate().toISOString(),
      moment(new Date()).endOf("isoWeek").toDate().toISOString()
    );
  }

  createChart(
    labels: Array<string>,
    hours: Array<number>,
    hired: Array<number>
  ) {
    const ctx = this._canvasRef.nativeElement.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "line",

      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of hours",
            data: hours,
            borderColor: "#8676FF",
            backgroundColor: "#8676FF",
            yAxisID: "y",
          },
          // {
          //   label: "Employee hired",
          //   data: hired,
          //   borderColor: "#4CAF50",
          //   backgroundColor: "#4CAF50",

          //   yAxisID: "y1",
          // },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0.4,
          },
        },
        animation: {
          radius: {
            duration: 400,
            easing: "linear",

            loop: (context) => context.active,
          },
        } as any,
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: null,
        },
        scales: {
          x: {
            grid: { display: false },
            type: "category",
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              text: "Number of  hours",
              display: true,
            },
            ticks: {
              precision: 0,
            },
            beginAtZero: true,
          },
          // y1: {
          //   type: "linear",
          //   display: true,
          //   position: "right",
          //   title: {
          //     text: "Number of employees hired",
          //     display: true,
          //   },
          //   ticks: {
          //     precision: 0,
          //   },
          //   beginAtZero: true,

          //   // grid line settings
          //   grid: {
          //     drawOnChartArea: false, // only want the grid lines for one axis to show up
          //   },
          // },
        },
      },
    });
  }

  listenFormValueChanges(event) {
    console.log(event);

    const filterParams = {
      ...this.searchSortFilter.value,
    };
    console.log(filterParams);

    this.getChartData(
      moment(new Date(filterParams.fromDate))
        .startOf("isoWeek")
        .toDate()
        .toISOString(),
      moment(new Date(filterParams.toDate))
        .endOf("isoWeek")
        .toDate()
        .toISOString()
    );
  }

  nextWeek() {
    this.weeklyCalendarRef.updateWeekIncDecreement(WEEK_UPDATE.INCREEMENT);
  }

  backWeek() {
    this.weeklyCalendarRef.updateWeekIncDecreement(WEEK_UPDATE.DECREEMENT);
  }
}
