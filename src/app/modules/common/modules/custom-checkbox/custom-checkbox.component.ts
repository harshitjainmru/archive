import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ICheckBox } from 'src/app/models/common.interface';
import {
  SWITCH_CUSTOM_CHECKBOX,
  CUSTOM_DATE_FORMATS,
} from 'src/app/constants/enums';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
})
export class CustomCheckboxComponent implements OnInit {
  @Input()
  set checkBoxConfigect(data: ICheckBox) {
    console.log('dataa', data);
    this.checkBoxConfig = data;
    this.setCheckboxData();
  }

  customDateformat = CUSTOM_DATE_FORMATS;

  @Output() _emitSelectionChanged = new EventEmitter();

  checkBoxConfig: ICheckBox;
  valuePatched = false;
  @ViewChildren('checkbox') checkBoxes: QueryList<any>;
  @ViewChild('selectAll') selectAllRef: MatCheckbox;

  checkboxTemplate;

  constructor() {}

  // On init life cycle hook
  ngOnInit(): void {
    this.checkboxTemplate = SWITCH_CUSTOM_CHECKBOX;
  }

  /**
   * Sets checkbox data
   */
  setCheckboxData() {
    setTimeout(() => {
      if (this.checkBoxConfig.control.value) {
        this.checkBoxes.toArray().forEach((checkbox) => {
          if (
            this.checkBoxConfig.control.value.find(
              (item) => item == checkbox.value
            )
          ) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
      } else {
        this.checkBoxes.toArray().forEach((checkbox) => {
          checkbox.checked = false;
        });
      }

      if (
        this.checkBoxConfig.control.value.length ===
          this.checkBoxConfig.list.length &&
        this.selectAllRef
      ) {
        this.selectAllRef.checked = true;
      }

      this.valuePatched = true;
    });
  }

  /**
   * Selects all checkboxes
   * @param event triggered on selection of all
   */
  selectAllCheckbox(event) {
    let value = event.checked ? true : false;
    this.checkBoxes.toArray().forEach((checkbox) => {
      checkbox.checked = value;
    });
    this.checkBoxConfig.control.setValue(
      this.checkBoxes
        .toArray()
        .filter((checkbox) => checkbox.checked)
        .map((item) => item.value)
    );
    if (event.checked) {
      this._emitSelectionChanged.emit([]);
    } else {
      this._emitSelectionChanged.emit([]);
    }
  }

  /**
   * ON checkbox value change
   * @param type checkbox type
   * @param ref checkbox element ref
   * @param checkboxItem checkbox data
   */
  onValueChange() {
    if (!this.valuePatched) {
      return;
    }

    setTimeout(() => {
      const data = this.checkBoxes
        .toArray()
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      this.checkBoxConfig.control.setValue(data.length ? data : null);

      if (this.selectAllRef) {
        if (data.length != this.checkBoxConfig.list.length) {
          this.selectAllRef.checked = false;
          this._emitSelectionChanged.emit([...data]);
        } else if (data.length === this.checkBoxConfig.list.length) {
          this._emitSelectionChanged.emit([...data]);
          this.selectAllRef.checked = true;
        }
      }
      console.log('waoaoa', this.checkBoxConfig);
    });
  }
}
