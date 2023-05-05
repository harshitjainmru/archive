import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Search...';
  @Input() label: string = 'Data not find.';
  @Input() preFilled: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  searchList = new FormControl();
  searchSub: Subscription;
  skilFirstLoad = true;

  constructor(@Inject(MatSelect) public matSelect: MatSelect) {}

  // On init life cycle hook
  ngOnInit() {
    this.realTimeSearch();
    const panelClass = 'mat-select-search-panel';
    if (this.matSelect.panelClass) {
      if (Array.isArray(this.matSelect.panelClass)) {
        this.matSelect.panelClass.push(panelClass);
      } else if (typeof this.matSelect.panelClass === 'string') {
        this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
      } else if (typeof this.matSelect.panelClass === 'object') {
        this.matSelect.panelClass[panelClass] = true;
      }
    } else {
      this.matSelect.panelClass = panelClass;
    }
    this.searchList.setValue(this.preFilled);
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  /**
   * Real time search
   */
  realTimeSearch() {
    this.searchSub = this.searchList.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => {
        this.searchEmit(res);
      });
  }

  /**
   * Searchs emit
   * @param text
   */
  searchEmit(text) {
    if (this.skilFirstLoad) {
      this.skilFirstLoad = false;
      return;
    }
    if (text) {
      text = text.trim();
      if (text) {
        this.search.emit(text.toLowerCase());
      }
    } else if (text == '' || !text) {
      this.search.emit('');
    }
  }

  /**
   * Handles keydown
   * @param event
   */
  _handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      // do not propagate spaces to MatSelect, as this would select the currently active option
      event.stopPropagation();
    }
  }

  /**
   * Clears value
   */
  clearValue() {
    this.searchList.setValue('');
  }
}
