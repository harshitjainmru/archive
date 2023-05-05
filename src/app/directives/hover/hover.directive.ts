import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {


  @Input() toolTipClass;
  @Input() element:ElementRef;

  constructor(
    private elementRef:ElementRef, 
    private renderer:Renderer2) { }
   
  ngOnInit(){
    this.renderer.listen(this.element , 'click',()=>{
      this.renderer.removeClass(this.element,this.toolTipClass)
    })
  }




  @HostListener('mouseenter') mouseover(){
    console.log('ahahahaah',this.element)
    this.renderer.addClass(this.element,this.toolTipClass)
  }
  

}
