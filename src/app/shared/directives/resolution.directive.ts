import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[getHeightWidth]',
  host: {
    '(click)':'show()'
  }
})
export class ResolutionDirective {

  constructor(
    private el : ElementRef
  ) { }

  show(){
    //console.log(this.el.nativeElement);
    //console.log('height---' + this.el.nativeElement.offsetHeight);
    //console.log('width---' + this.el.nativeElement.offsetWidth);
  }

}
