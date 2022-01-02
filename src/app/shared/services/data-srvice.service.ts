import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {Academy} from '../models/academy.model'

@Injectable({
  providedIn: 'root'
})

export class DataSrviceService {

  p: Academy;
  observer = new BehaviorSubject("");
  public subscriber = this.observer.asObservable();

  emitData(data) {
    this.observer.next(data);
  }
}
