import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {
  @Input('appBackground') bgColor: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.bgColor = this.bgColor || '#eee';
  }

  @HostListener('click')
  onMouseClick() {
    const el: HTMLElement = this.el.nativeElement;
    const originalBackground = el.style.background;

    this.renderer.setStyle(el, 'background', `${this.bgColor}`);

    setTimeout(() => {
      this.renderer.setStyle(el, 'background', originalBackground);
    }, 300);
  }
}
