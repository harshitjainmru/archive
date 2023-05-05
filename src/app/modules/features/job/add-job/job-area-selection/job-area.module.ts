import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAreaSelectionComponent } from './job-area-selection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NumberOnlyModule } from 'src/app/directives/number-only/number-only.module';
import { TrimValuesModule } from 'src/app/directives/trim/trim-values.module';
import { ChipSearchFormModule } from 'src/app/modules/common/modules/chip-search-form/chip-search-form.module';
import { SelectSearchModule } from 'src/app/modules/common/modules/select-search/select-search.module';
import { ConstantParserModule } from 'src/app/pipes/constant-parser/constant-parser.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';

@NgModule({
    declarations: [JobAreaSelectionComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        TrimValuesModule,
        MatAutocompleteModule,
        SearchFilterModule,
        SelectSearchModule,
        ValidationErrorPipeModule,
        GetControlModule,
        ChipSearchFormModule,
        NumberOnlyModule,
        ConstantParserModule,
    ],
    exports: [JobAreaSelectionComponent]
})
export class JobAreaModule { }
