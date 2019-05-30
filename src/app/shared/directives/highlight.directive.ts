import { Directive, ElementRef, HostListener, Input, OnChanges, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') highlightColor: string;

  private originalColor: string;
  private isHighlighted: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.highlightColor = this.highlightColor || 'black';
  }

  @HostBinding('class.highlighted')
  get highlighted(): boolean {
    return this.isHighlighted;
  }

  @HostListener('mouseenter')
  onmouseenter() {
    const element: HTMLElement = this.el.nativeElement;

    this.originalColor = element.style.borderColor;
    element.style.borderColor = this.highlightColor;
    this.isHighlighted = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    (this.el.nativeElement as HTMLElement).style.borderColor = this.originalColor;
    this.isHighlighted = false;
  }
}
