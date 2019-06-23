import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let timeStart: Date;
    if (req.url.includes('orders')) {
      timeStart = new Date();
    }

    return next.handle(req).pipe(
      filter(event => event instanceof HttpResponse),
      map((event: HttpResponse<any>) => {
        if (event.url.includes('orders')) {
          const timeEnd = new Date();
          console.log(
            'TimingInterceptor, duration ',
            this.getDiff(timeStart, timeEnd)
          );
        }

        return event;
      })
    );
  }

  private getDiff(timeStart: Date, timeEnd: Date): string {
    const diff = timeEnd.getTime() - timeStart.getTime();
    const milliseconds = diff % 1000;
    const seconds = Math.floor(diff / 1000) % 60;
    const mins = Math.floor(diff / 1000 / 60) % 60;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minsStr = mins < 10 ? '0' + mins : mins;
    const secStr = seconds < 10 ? '0' + seconds : seconds;
    return `${hoursStr}:${minsStr}:${secStr}.${milliseconds}`;
  }
}
