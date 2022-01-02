import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  observer = new Subject();
  public subscriber = this.observer.asObservable();

  emitData(data) {
    this.observer.next(data);
  }
}
