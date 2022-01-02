import { Injectable } from '@angular/core';
import { BehaviorSubject, from} from 'rxjs';
import {EventC} from '../models/event.model';
@Injectable({
  providedIn: 'root'
})
export class EventCalendarService {
  p: EventC = null;
  observer = new BehaviorSubject(this.p);
  public subscriber = this.observer.asObservable();

  emitData(data: EventC) {
    this.observer.next(data);
  }
}
