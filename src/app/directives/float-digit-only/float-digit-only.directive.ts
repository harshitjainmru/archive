import { Directive, ElementRef, HostListener } from '@angular/core';
import { isRegExp } from 'util';

@Directive({
  selector: '[appFloatDigitOnly]'
})
export class FloatDigitOnlyDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData("text/plain")
      .replace(/[+-]?([0-9]*[.])?[0-9]+/g, ""); // get a digit-only string
    document.execCommand("insertText", false, pastedInput);
  }
  @HostListener("keydown", ["$event"]) onKeyDown(e: KeyboardEvent) {
    
    console.log(this.elementRef.nativeElement.value)
    console.log(e)
    const ref=this.elementRef.nativeElement;
    const RegExp=/^\d*\.{0,1}\d*$/;
    
    if(e.keyCode==190 && ref.value?.length==0){
      e.preventDefault();
      return
    }
    if (e.keyCode==190 && ref.value.indexOf('.')>-1) {
      e.preventDefault();
      return
     
  } 

  
    
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [46, 8, 9, 27, 13, 190,110].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
    ) {
      return; // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
      if(ref.value.indexOf('.')>-1 && ref.value.split('.')?.at(-1)?.length>=2){
        e.preventDefault();
        return
      }
  }
  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer.getData("text").replace(/\D/g, "");
    // this.elementRef.focus();
    document.execCommand("insertText", false, textData);
  }

  @HostListener("blur", ["$event"])
  onBlur(event:FocusEvent) {
    
    const ref=this.elementRef.nativeElement;
   
    if(ref.value.at(-1)=='.'){
     
      ref.value+=0;
    }
    // if(event.)
    
  }

}
