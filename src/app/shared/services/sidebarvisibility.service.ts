import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarvisibilityService {

  observer = new Subject<boolean>();
  public subscriber = this.observer.asObservable();

  emitData(data: boolean) {
    this.observer.next(data);
  }
}
