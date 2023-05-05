import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @Input() label;
  @Input() images;

  constructor() {}

  // On init life cycle hook
  ngOnInit(): void {
    this.galleryOptions = [
      {
        image: false,
        thumbnails: false,
        width: '0',
        height: '0',
        closeIcon: 'fa fa-times-circle',
        // previewZoom: true,
        previewRotate: true,
      },
    ];

    // this.galleryImages = [
    //     {
    //       small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //       medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //       big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    //     } ,
    //     {
    //       small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //       medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    //       big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    //   }
    // ];

    //-------- gallery
  }

  // This will get url
  getUrl(item: []) {
    this.galleryImages = [];
    item.forEach((element) => {
      this.galleryImages.push({
        small: element,
        medium: element,
        big: element,
      });
    });
    return this.galleryImages;
  }

  // This will open preview
  previewOpen(gallery): void {
    gallery.openPreview(gallery.preview.index);
  }
}
