import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChipSearchFormComponent } from 'src/app/modules/common/modules/chip-search-form/chip-search-form.component';
import { WorkerService } from '../service/worker.service';
import { IExprence } from '../worker.model';

@Component({
  selector: 'app-search-worker',
  templateUrl: './search-worker.component.html',
  styleUrls: ['./search-worker.component.scss']
})
export class SearchWorkerComponent implements OnInit {
  @ViewChild(ChipSearchFormComponent) chipComponent: ChipSearchFormComponent;
  searchForm: FormGroup;
  experienceData: Array<IExprence> = [];
  @Output() filterData = new EventEmitter(false);
  constructor(
    private fb: FormBuilder,
    private workerService: WorkerService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getExprencedData();
  }

  createForm() {
    this.searchForm = this.fb.group({
      search: [''],
      levelOfExperience: [''],
      skills: ['']
    })
  }

  getExprencedData() {
    this.workerService.constantsLists().then((data) => {
      this.experienceData = data['EXPERIENCE_LEVEL'];
    })
  }

  get formData() {
    return JSON.parse(JSON.stringify(this.searchForm.value));
  }

  onSubmit() {
    // // const skillData = this.chipComponent.selectedItem;
    // const skill = skillData && skillData.length ? JSON.stringify(skillData.map(item => item['_id'])) : null;
    // this.filterData.emit({ ...this.searchForm.value, skills: skill });
  }

  onReset() {
    // this.chipComponent.onClearSelectedItem();
    // this.filterData.emit(false);
  }
}
