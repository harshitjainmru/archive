import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateInfoComponent } from './candidate-info.component';
import { JobListService } from '../../job-list/job-list.service';
import { NoRecordModule } from 'src/app/modules/common/modules/no-record/no-record.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [CandidateInfoComponent],
  imports: [
    CommonModule,
    NoRecordModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  exports: [CandidateInfoComponent],
  providers: [JobListService]
})
export class CandidateInfoModule { }
