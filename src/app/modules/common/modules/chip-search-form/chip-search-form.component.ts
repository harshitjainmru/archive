import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
  switchMap,
} from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { WorkerService } from 'src/app/modules/features/worker/service/worker.service';
import { ISkill } from 'src/app/modules/features/worker/worker.model';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';
import {
  PAGE_KEY,
  LIMIT_KEY,
  PAGE_OPTION_LIMIT,
  SESSION_KEYS,
} from 'src/app/constants/constant';
import { ISearchAutocomplete } from 'src/app/models/common.interface';
import { HttpService } from 'src/app/services/http.service';

import { CUSTOM_HANDLE_ERROR } from 'src/app/constants/enums';

@Component({
  selector: 'app-chip-search-form',
  templateUrl: './chip-search-form.component.html',
  styleUrls: ['./chip-search-form.component.scss'],
})
export class ChipSearchFormComponent implements OnInit {
  @Output() listienSelection = new EventEmitter();
  showAll: boolean = false;
  hideMore: boolean = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchCtrl = new FormControl(['']);
  @Input() dataLists: Array<ISkill> = [];
  searchText: string = '';
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input() searchObject: ISearchAutocomplete;
  results = [];
  page = 1;
  loading = false;
  searching = false;
  nextPageStatus = true;
  subscription = new Subscription();
  loadMoreSubscription: Subscription;
  @Input() parant = 'worker';
  selectedChip = [];

  constructor(
    private utilityService: UtilityService,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.loadResults();
    this.initiateListener();
  }

  /**
   * Initiates listener will start listening to search input text and
   * will fetch the related records from api
   */
  initiateListener() {
    this.searchObject?.control?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((text) => {
          let trimedText = text ? text.trim() : '';
          return trimedText;
        }),
        filter((text) => !!text && typeof text === 'string'),
        switchMap((text) => {
          if (this.searchObject.control.valid) {
            this.searching = true;
            this.loading = false;
            this.nextPageStatus = true;
            return this.search();
          } else {
            return Promise.resolve(0);
          }
        })
      )
      .subscribe(
        (response) => {
          if (response) {
            this.updateResults(response);
          } else {
            this.searching = false;
            this.loading = false;
          }
        },
        (error) => {}
      );
  }

  /**
   * search will fetch records from api
   * @returns api
   */
  search() {
    let params: any = {
      ...PAGE_OPTION_LIMIT(10),
    };
    if (this.searchObject.isPagination) {
      switch (this.parant) {
        case 'job':
          params = {
            ...params,
            ...this.searchObject.searchQuery,
            search: this.searchObject.control.value.trim(),
          };
          break;
        case 'job-role':
          params = {
            ...params,
            ...this.searchObject.searchQuery,
            search: this.searchObject.control.value.trim(),
          };
          break;

        case 'worker':
          params = {
            ...params,
            isClient: true,
            search: this.searchObject.control.value.trim(),
          };
          break;

        case 'skills':
          params = {
            ...params,
            search: this.searchObject.control.value.trim(),
          };
          break;
        case 'searchApplicantskills':
          params = {
            ...params,
            ...this.searchObject.queryParams,
            search: this.searchObject.control.value.trim(),
          };
          break;
        case 'jobSite':
          params = {
            ...params,
            ...this.searchObject.queryParams,
            search: this.searchObject.control.value.trim(),
          };
          break;

        default:
          params = {
            ...params,
          };
      }
    } else {
      params['search'] = this.searchObject.control.value.trim();
    }

    return this.http.get(this.searchObject.url, {
      ...params,
    });
  }

  /**
   * Loads results of search response
   */
  loadResults() {
    this.loading = true;
    this.search().subscribe(
      (response) => {
        this.updateResults(response);
      },
      (error) => {}
    );
  }

  /**
   * Updates results will update page params and result array
   * @param response api response
   */
  updateResults(response) {
    // this.results = (this.results || []).concat(
    //   Array.isArray(response.data) ? response.data : response.data.result
    // );
    if (this.parant === 'jobSite') {
      response.data.result = this.flattenJobSiteObj(response.data.result);
    }
    this.results =
      response.data && Array.isArray(response.data.result)
        ? [...response.data.result]
        : [];

    this.nextPageStatus = response.data.nextPageStatus;
    ++this.page;
    this.searching = false;
    this.loading = false;
  }

  flattenJobSiteObj(array) {
    const result = [];
    if (array) {
      array.forEach((site) => {
        result.push(site.job_Site);
      });
    }
    return result;
  }

  /**
   * Options selected is called when we select any option from the list
   * @param data option data on selection
   */
  optionSelected(data: MatAutocompleteSelectedEvent) {
    const index = this.searchObject.selectedValue.findIndex(
      (item) =>
        item[this.searchObject.valueKey] ===
        data.option.value[this.searchObject.valueKey]
    );
    if (index < 0) {
      try {
        if (this.searchObject.selectedValue.length >= this.searchObject.limit) {
          throw { type: CUSTOM_HANDLE_ERROR.DROPDOWN_LIMIT };
        }

        this.searchObject.selectedValue.push({
          ...data.option.value,
        });
        this.searchObject.selectedViewValue.push(
          data.option.value[this.searchObject.viewKey]
        );
        this.searchObject.selectedControl.setValue(
          this.searchObject.selectedValue.map(
            (items) => items[this.searchObject.valueKey]
          )
        );
      } catch (error) {
        if (error && error.type === CUSTOM_HANDLE_ERROR.DROPDOWN_LIMIT) {
          this.utilityService.showAlert(
            `Sorry! only ${this.searchObject.limit} selection are allowed !`
          );
        }
      }
    }
    this.searchObject.control.setValue('');

    if (this.searchObject.localSave) {
      this.utilityService.setSessionStorage(
        SESSION_KEYS[this.searchObject.localSaveKey],
        JSON.stringify({
          selectedValue: this.searchObject.selectedValue,
          selectedViewValue: this.searchObject.selectedViewValue,
        })
      );
    }
  }

  /**
   * Blur called when user is blur from search input
   */
  blur() {
    this.searchObject.control.markAllAsTouched();
    this.searchObject.control.markAsDirty();
  }

  /**
   * Adds chip search form component
   * @param event
   * if you want add item by input text then uncomment this.selectedChip.push(value.trim()); below
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our item
    if ((value || '').trim()) {
      // this.selectedChip.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.searchCtrl.setValue(null);
  }

  // This will remove chip
  remove(chip): void {
    const index = this.searchObject.selectedValue.findIndex(
      (item) =>
        item[this.searchObject.valueKey] === chip[this.searchObject.valueKey]
    );
    if (index >= 0) {
      this.searchObject.selectedValue.splice(index, 1);
      this.searchObject.selectedControl.setValue(
        this.searchObject.selectedValue.map(
          (items) => items[this.searchObject.valueKey]
        )
      );
    }
  }
}
