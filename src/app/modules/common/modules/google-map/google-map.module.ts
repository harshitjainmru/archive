import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map.component';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapService } from './_service/google-map.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [GoogleMapComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapAPIKey,
      libraries: ["places"]
    })
  ],
  exports: [
    GoogleMapComponent,
    ReactiveFormsModule,
  ],
  providers: [GoogleMapService]
})
export class GoogleMapModule { }