import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { COUNTRY_LIST } from '../../../../constants/country-list';
import { UtilityService } from '../../../../services/utility.service';
import { filter } from 'rxjs/operators';
import { SelectSearchComponent } from '../select-search/component/select-search/select-search.component';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
})
export class PhoneFieldComponent implements OnInit {
  @Output() hideBackendError = new EventEmitter();
  @Input() phoneForm: FormGroup;
  @Input() label = 'PHONE';
  @Input() isLabel: boolean = true;
  @ViewChild(SelectSearchComponent) selectSearch: SelectSearchComponent;
  @ViewChild(MatSelect) selectElem: MatSelect;
  @Input() autoSelect = true;

  opened = false;
  countryList = COUNTRY_LIST;
  search = '';
  selectedCountryFlag: string;

  constructor(private utility: UtilityService) {}

  // On init life cycle hook
  ngOnInit(): void {
    if (this.autoSelect) {
      this.utility.countryCode.pipe(filter((data) => data !== '')).subscribe(
        (data) => {
          if (data === null) {
            data = 'SG';
          }
          let country = this.countryList.find(
            (country) => country.code == data || country.alpha3Code == data
          );
          if (country) {
            this.phoneForm.controls.countryCode.setValue(country.code);
            this.selectedCountryFlag = country.flag;
          }
        },
        (err) => {}
      );
    }
  }

  // On init life cycle hook
  ngAfterViewInit() {
    this.selectElem.openedChange
      .pipe(filter((data) => !!data))
      .subscribe(() => {
        const panel: ElementRef<HTMLDivElement> = this.selectElem.panel;
        panel.nativeElement.scrollTop = 0;
      });
  }

  // This will panel toggle
  panelToggled(status) {
    this.selectSearch.searchList.setValue('');
    this.search = '';
    this.opened = status;
  }
}
