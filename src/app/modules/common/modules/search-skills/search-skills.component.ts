import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pagination } from 'src/app/constants/pagination';
import { JobService } from 'src/app/modules/features/job/add-job/service/job.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-search-skills',
  templateUrl: './search-skills.component.html',
  styleUrls: ['./search-skills.component.scss'],
})
export class SearchSkillsComponent
  extends Pagination
  implements OnInit, AfterViewInit
{
  searchValue = new FormControl(['']);
  selectedSkills: any = [];
  skillData: any = [];
  @Input() controls: FormControl = new FormControl();
  @Output() selectedItem = new EventEmitter();
  isLoader: boolean = false;
  // search variables
  public isSearch: boolean = false;
  /* INFINITE SCROLL */
  @ViewChild('selectElem', { static: true }) selectElem: any;

  private readonly PIXEL_TOLERANCE = 3.0;
  viewIndex = 0;
  windowSize = 10;
  nextHit = false;
  /* INFINITE SCROLL ends */
  constructor(
    private jobService: JobService,
    private skillService: JobService,
    private utility: UtilityService
  ) {
    super();
  }

  // On init life cycle hook
  ngOnInit(): void {
    this.getSkills();
    this.setSkills();
  }

  // After View init life cycle hook
  ngAfterViewInit() {
    this.selectElem.openedChange.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  // Set skills in selectedSkills array and send selectedItem by @output
  setSkills() {
    if (this.jobService.jobDetails) {
      this.selectedSkills = [];
      this.selectedSkills = this.jobService.jobDetails.skills;
      this.selectedItem.emit(this.selectedSkills);
    }
  }

  // This will get Skill list for select
  async getSkills() {
    this.isLoader = !this.isLoader;
    this.limit = 20;
    const query = { ...this.validPageOptions };
    await this.skillService
      .jobSkillList(query)
      .then(({ data: { result, next } }) => {
        this.isLoader = !this.isLoader;
        this.nextHit = next;
        console.log(result, this.selectedSkills);
        result = this.arrayDiference(this.selectedSkills, result);
        console.log(result);
        if (!this.skillData) {
          this.skillData = result;
        } else {
          result.forEach((item) => {
            this.skillData.push(item);
          });
        }
      });
  }

  // Selecting skill value in set with id
  arrayDiference(
    smallerArray: Array<{ _id }>,
    responseArray: Array<any>
  ): Array<any> {
    let set = new Set();
    smallerArray.forEach(({ _id }) => {
      set.add(_id);
    });

    console.log(set);

    return responseArray.filter(({ _id }) => !set.has(_id));
  }

  // This will select skill max 5
  onSelectionChange(item: any) {
    if (this.selectedSkills.length < 5) {
      const found = this.selectedSkills.some((arr) => arr._id == item._id);
      if (!found) {
        this.selectedSkills.push(item);
      }
      this.selectedItem.emit(this.selectedSkills);
      this.skillData = this.arrayDiference([item], this.skillData);
    } else {
      this.utility.showAlert('You have already Selected 5 skills');
    }
    (this.selectElem.options as any)._results.forEach(
      (opt) => (opt._selected = false)
    );
    this.selectElem.value = null;
  }

  // This will remove selected skill
  onRemove(item) {
    const index = this.selectedSkills.indexOf(item);
    if (index >= 0 && this.selectedSkills.length >= 1) {
      this.selectedSkills.splice(index, 1);
      console.log(item);
      this.skillData.push(item);
    }
    this.selectedItem.emit(this.selectedSkills);
    if (this.selectedSkills.length <= 0) {
      this.controls.patchValue('');
    }
  }

  //searching...
  searchSkills(text: string) {
    text ? (this.isSearch = true) : (this.isSearch = false);
    this.skillData = [];
    this.search = text;
    this.resetPages();
    this.getSkills();
  }

  /* FETCH MORE DATA ON SCROLL DOWN */
  getNextBatch() {
    if (!this.nextHit) {
      return;
    }
    ++this.page;
    this.getSkills();
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

  // Load for next scroll
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

  /* END INFINITE SCROLL */
}
