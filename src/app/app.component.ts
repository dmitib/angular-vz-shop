import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('appTitle') title: ElementRef;

  ngOnInit() {
    const title: HTMLHeadingElement = this.title.nativeElement;
    title.innerText = 'VZ-Shop App';
  }
}
