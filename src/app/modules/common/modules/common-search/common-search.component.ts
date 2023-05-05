import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounce, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-common-search",
  templateUrl: "./common-search.component.html",
  styleUrls: ["./common-search.component.scss"],
})
export class CommonSearchComponent implements OnInit {
  @Input() placeholder;
  @Output() setSearch = new EventEmitter();
  @Input() search = "";
  searchControl = new FormControl("");
  /**
   * Creates an instance of search filter component.
   */
  constructor() {}

  subscribeToSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((data) => {
        this.setSearch.emit(data.trim());
      });
  }
  /**
   * on init life cycle hook
   */
  ngOnInit() {
    this.searchControl.setValue(this.search);
    this.subscribeToSearch();
  }
  /**
   * Searchs result
   */
  searchResult() {
    this.setSearch.emit(this.searchControl.value.trim());
  }
  /**
   * Resets search
   */
  resetSearch() {
    this.search = "";
    this.searchControl.setValue("");
    this.setSearch.emit("");
  }
}
