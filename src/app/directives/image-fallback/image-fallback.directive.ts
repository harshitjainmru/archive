import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageFallback]'
})
export class ImageFallbackDirective {

  @Input() alt: string;


  constructor(private eRef: ElementRef) {
   }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = this.alt  || 'assets/images/ic_place holder.svg';
  }

}
