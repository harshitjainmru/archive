import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './view/image-gallery.component';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [
    CommonModule,
    NgxGalleryModule,
    HttpClientModule
  ],
  exports :[
    ImageGalleryComponent
  ]
})
export class ImageGalleryModule { }
