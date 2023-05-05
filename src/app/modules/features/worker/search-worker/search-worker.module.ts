import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchWorkerComponent } from './search-worker.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WorkerCardModule } from '../worker-card/worker-card.module';
import { WorkerService } from '../service/worker.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TrimValuesModule } from 'src/app/directives/trim/trim-values.module';
import { MatIconModule } from '@angular/material/icon';
import { ChipSearchFormModule } from 'src/app/modules/common/modules/chip-search-form/chip-search-form.module';

@NgModule({
  declarations: [SearchWorkerComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    WorkerCardModule,
    ReactiveFormsModule,
    ChipSearchFormModule,
    TrimValuesModule,
    MatIconModule,
  ],
  exports: [SearchWorkerComponent],
  providers: [WorkerService]
})
export class SearchWorkerModule { }
