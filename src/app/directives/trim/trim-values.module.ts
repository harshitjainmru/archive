import { NgModule } from '@angular/core';
import { TrimValuesDirective } from './trim-values.directive';

@NgModule({
  declarations: [TrimValuesDirective],
  exports: [TrimValuesDirective]
})
export class TrimValuesModule {}
 