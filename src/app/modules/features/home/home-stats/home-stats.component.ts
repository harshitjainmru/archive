import { Component, OnInit } from "@angular/core";
import { HomeService } from "../home.service";

@Component({
  selector: "app-home-stats",
  templateUrl: "./home-stats.component.html",
  styleUrls: ["./home-stats.component.scss"],
})
export class HomeStatsComponent implements OnInit {
  activeStaffCount: number = 0;
  avgRating: number = 0;
  leftPostion: number = 0;
  newApplicantsThisWeek: number = 0;
  newOfferThisWeek: number = 0;
  ongoingJobs: number = 0;
  openedJobs: number = 0;
  staffRated: number = 0;

  maxactiveStaffCount: number = 0;
  maxavgRating: number = 0;
  maxleftPostion: number = 0;
  maxnewApplicantsThisWeek: number = 0;
  maxnewOfferThisWeek: number = 0;
  maxongoingJobs: number = 0;
  maxopenedJobs: number = 0;
  maxstaffRated: number = 0;
  constructor(private homeService: HomeService) {
    this.getStats();
  }

  async getStats() {
    const {
      data: {
        activeStaffCount,
        avgRating,
        leftPostion,
        newApplicantsThisWeek,
        newOfferThisWeek,
        ongoingJobs,
        openedJobs,
        staffRated,
      },
    } = await this.homeService.getDashboardStats({ type: 3 });
    this.maxactiveStaffCount = activeStaffCount || 0;
    this.maxavgRating = avgRating || 0;
    this.maxleftPostion = leftPostion;
    this.maxnewApplicantsThisWeek = newApplicantsThisWeek || 0;
    this.maxnewOfferThisWeek = newOfferThisWeek || 0;
    this.maxongoingJobs = ongoingJobs || 0;
    this.maxopenedJobs = openedJobs || 0;
    this.maxstaffRated = staffRated || 0;

    this.animateNumbers();
  }
  ngOnInit(): void {}

  animateNumbers() {
    if (this.avgRating < this.maxavgRating) {
      const int = setInterval(() => {
        this.avgRating++;
        if (this.avgRating >= this.maxavgRating) {
          clearInterval(int);
        }
        console.log("**");
      }, 1);
    }

    if (this.activeStaffCount < this.maxactiveStaffCount) {
      const int1 = setInterval(() => {
        this.activeStaffCount++;
        if (this.activeStaffCount >= this.maxactiveStaffCount) {
          clearInterval(int1);
        }
      }, 1);
    }

    if (this.leftPostion < this.maxleftPostion) {
      const int2 = setInterval(() => {
        this.leftPostion++;
        if (this.leftPostion >= this.maxleftPostion) {
          clearInterval(int2);
        }
      }, 1);
    }

    if (this.newApplicantsThisWeek < this.maxnewApplicantsThisWeek) {
      const int3 = setInterval(() => {
        this.newApplicantsThisWeek++;
        if (this.newApplicantsThisWeek >= this.maxnewApplicantsThisWeek) {
          clearInterval(int3);
        }
      }, 1);
    }

    if (this.newOfferThisWeek < this.maxnewOfferThisWeek) {
      const int4 = setInterval(() => {
        this.newOfferThisWeek++;
        if (this.newOfferThisWeek >= this.maxnewOfferThisWeek) {
          clearInterval(int4);
        }
      }, 1);
    }

    if (this.ongoingJobs < this.maxongoingJobs) {
      const int5 = setInterval(() => {
        this.ongoingJobs++;
        if (this.ongoingJobs >= this.maxongoingJobs) {
          clearInterval(int5);
        }
      }, 1);
    }

    if (this.openedJobs < this.maxopenedJobs) {
      const int6 = setInterval(() => {
        this.openedJobs++;
        if (this.openedJobs >= this.maxopenedJobs) {
          clearInterval(int6);
        }
      }, 1);
    }

    if (this.staffRated < this.maxstaffRated) {
      const int7 = setInterval(() => {
        this.staffRated++;
        if (this.staffRated >= this.maxstaffRated) {
          clearInterval(int7);
        }
      }, 1);
    }
  }
}
