import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  p: string;
  observer = new BehaviorSubject<string>("");
  public subscriber = this.observer.asObservable();

  emitData(data) {
    this.observer.next(data);
  }
}
