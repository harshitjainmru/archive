import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pagination } from 'src/app/constants/pagination';
import { JobService } from 'src/app/modules/features/job/add-job/service/job.service';
@Component({
  selector: 'app-search-job-role',
  templateUrl: './search-job-role.component.html',
  styleUrls: ['./search-job-role.component.scss'],
})
export class SearchJobRoleComponent
  extends Pagination
  implements OnInit, AfterViewInit
{
  selectedJobRole: any = [];
  jobRoleData: any = [];
  @Input() controls: FormControl = new FormControl();
  @Output() selectedItem = new EventEmitter();
  @Input() filterKey = {};
  isLoader: boolean = false;
  // search variables
  public isSearch: boolean = false;
  /* INFINITE SCROLL */
  @ViewChild('selectElem', { static: false }) selectElem: any;

  private readonly PIXEL_TOLERANCE = 3.0;
  viewIndex = 0;
  windowSize = 10;
  nextHit = false;
  /* INFINITE SCROLL ends */
  constructor(private roleService: JobService) {
    super();
  }

  // On init life cycle hook
  ngOnInit(): void {
    this.getJobRole();
  }

  // After viewinit life cycle hook
  ngAfterViewInit() {
    this.selectElem.openedChange.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  // This will get Job role
  getJobRole() {
    this.isLoader = !this.isLoader;
    this.limit = 20;
    const query = { ...this.validPageOptions, ...this.filterKey };
    this.roleService.jobRoleList(query).then(({ data: { result, next } }) => {
      this.isLoader = !this.isLoader;
      this.nextHit = next;
      if (!this.jobRoleData) {
        this.jobRoleData = result;
      } else {
        result.forEach((item) => {
          this.jobRoleData.push(item);
        });
      }
      if (!!this.controls.value) {
        console.log(this.jobRoleData, this.controls.value);

        console.log(
          this.jobRoleData.find((item) => item._id == this.controls.value)
        );

        this.selectedItem.emit(
          this.jobRoleData.find((item) => item._id == this.controls.value)
        );
      }
    });
  }

  // SEARCH
  searchRoles(text: string) {
    text ? (this.isSearch = true) : (this.isSearch = false);
    this.jobRoleData = [];
    this.search = text;
    this.resetPages();
    this.getJobRole();
  }

  /* FETCH MORE DATA ON SCROLL DOWN */
  getNextBatch() {
    if (!this.nextHit) {
      return;
    }
    ++this.page;
    this.getJobRole();
  }

  trackByFn(index, menuInfo) {
    return menuInfo._id;
  }

  /* INFINITE SCROLL */

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

  //This will load next Scroll
  loadNextOnScroll(event) {
    if (this.hasScrolledToBottom(event.target)) {
      this.viewIndex += this.windowSize;
      this.getNextBatch();
    }
  }

  // This will use scroll to bottom
  private hasScrolledToBottom(target): boolean {
    return (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      this.PIXEL_TOLERANCE
    );
  }

  // This will change value of jobRole
  valueChanged(event) {
    console.log(this.jobRoleData.find((item) => item._id == event));
    this.selectedItem.emit(this.jobRoleData.find((item) => item._id == event));
  }

  /* END INFINITE SCROLL */
}
