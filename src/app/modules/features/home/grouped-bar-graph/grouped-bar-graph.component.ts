import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import Chart from "chart.js/auto";
import { MonthlyCalenderGraphComponent } from "src/app/modules/common/modules/monthly-calender-graph/monthly-calender-graph.component";
import * as moment from "moment";
import { HomeService } from "../home.service";

@Component({
  selector: "app-grouped-bar-graph",
  templateUrl: "./grouped-bar-graph.component.html",
  styleUrls: ["./grouped-bar-graph.component.scss"],
})
export class GroupedBarGraphComponent implements OnInit, AfterViewInit {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {}

  @ViewChild("canvasElement") _canvasRef: ElementRef<HTMLCanvasElement>;
  @ViewChild("monthlyRef")
  monthlyRef: MonthlyCalenderGraphComponent;
  chart: Chart = null;
  labels = [];
  payload;
  showLoader = false;
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  ngAfterViewInit(): void {
    let monthEndDate = moment().endOf("month").toDate();
    let monthStartDate;
    if (moment(monthEndDate).month() == 0) {
      monthStartDate = moment().startOf("month").toDate();
    } else if (moment(monthEndDate).month() == 1) {
      monthStartDate = moment().subtract(1, "month").startOf("month").toDate();
    } else {
      monthStartDate = moment().subtract(2, "month").startOf("month").toDate();
    }
    this.getChartData({ monthStartDate, monthEndDate });
  }

  next() {
    this.monthlyRef.next();
  }
  previous() {
    this.monthlyRef.previous();
  }

  createLabels(monthEndDate) {
    if (moment(monthEndDate).month() == 0) {
      this.labels = ["Jan"];
    } else if (moment(monthEndDate).month() == 1) {
      this.labels = ["Jan", "Feb"];
    } else {
      this.labels = [
        ...this.months.slice(
          moment(monthEndDate).month() - 2,
          moment(monthEndDate).month() + 1
        ),
      ];
    }
  }

  handleMonthChanged(payload) {
    this.getChartData(payload);
  }

  async getChartData(payload) {
    //get data from server
    if (this.chart) {
      this.chart.destroy();
    }
    console.log(payload);
    this.showLoader = true;
    this.createLabels(payload.monthEndDate);

    const query = { ...payload, type: 2 };
    const { data } = await this.homeService.getDashboardStats(query);
    if (data && Object.entries(data).length > 0) {
      const { jobContractSignedCount, jobOfferSendCount, totalAppliedCount } =
        data;

      let monthArr = [];
      if (moment(payload.monthEndDate).month() == 0) {
        monthArr = [0];
      } else if (moment(payload.monthEndDate).month() == 1) {
        monthArr = [0, 1];
      } else {
        monthArr = [
          moment(payload.monthStartDate).month(),
          moment(payload.monthStartDate).month() + 1,
          moment(payload.monthStartDate).month() + 2,
        ];
      }
      const chartData = { applicants: [], offers: [], accepted: [] };
      for (let index = 0; index < monthArr.length; index++) {
        let data1 = this.findDataAccordingToMonth(
          totalAppliedCount,
          monthArr[index]
        );
        let data2 = this.findDataAccordingToMonth(
          jobOfferSendCount,
          monthArr[index]
        );
        let data3 = this.findDataAccordingToMonth(
          jobContractSignedCount,
          monthArr[index]
        );
        console.log(data1, data2, data3);
        if (data1) {
          chartData.applicants.push(data1.countMonthly);
        } else {
          chartData.applicants.push(0);
        }
        if (data2) {
          chartData.offers.push(data2.countMonthly);
        } else {
          chartData.offers.push(0);
        }

        if (data3) {
          chartData.accepted.push(data3.countMonthly);
        } else {
          chartData.accepted.push(0);
        }

        // chartData.offers.push(jobOfferSendCount[index]?.countMonthly || 0);
        // chartData.accepted.push(
        //   jobContractSignedCount[index]?.countMonthly || 0
        // );
      }
      console.log(chartData);
      this.renderChart(chartData);
    } else {
      this.renderChart({ applicants: [], offers: [], accepted: [] });
    }
    this.showLoader = false;
  }

  findDataAccordingToMonth(data: Array<any>, month) {
    return data.find((item) => moment(item.date).month() == month);
  }
  renderChart(
    data: { applicants: number[]; offers: number[]; accepted: number[] },
    labels?
  ) {
    var delayed;

    const ctx = this._canvasRef.nativeElement.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "bar",

      data: {
        labels: [...this.labels],
        datasets: [
          {
            label: "No of Applicants",
            data: [...data.applicants],
            backgroundColor: "#96A5B8",
            barThickness: 40,
          },
          {
            label: "No of job offer",
            data: [...data.offers],
            backgroundColor: "#FF9800",
            barThickness: 40,
          },
          {
            label: "Offer accepted",
            data: [...data.accepted],
            backgroundColor: "#4CAF50",
            barThickness: 40,
          },
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context: any) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        plugins: {
          // title: {
          //   display: true,
          //   text: "Chart.js Bar Chart - Stacked",
          // },
          legend: null,
        },
        responsive: true,

        scales: {
          x: {
            stacked: true,
            grid: { display: false },
          },
          y: {
            stacked: true,
            ticks: {
              precision: 0,
            },
            beginAtZero: true,
          },
        },
      },
    });
  }
}
