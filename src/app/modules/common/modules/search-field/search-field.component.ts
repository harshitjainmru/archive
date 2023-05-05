import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  @Input() placeholder;
  @Output() setSearch = new EventEmitter();
  search = '';
  constructor() {}

  ngOnInit() {}

  // This will send search value to parant component
  searchResult() {
    // if (this.search.trim()) {
    //   this.setSearch.emit(this.search);
    // }
    this.setSearch.emit(this.search.trim());
  }

  // This will reset value of search
  resetSearch() {
    this.search = '';
    this.setSearch.emit('');
  }

  // This will reset search
  onChange(value) {
    if (!value) {
      this.resetSearch();
    }
  }
}
