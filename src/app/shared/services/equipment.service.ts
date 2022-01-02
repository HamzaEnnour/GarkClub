import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { EquipmentModel } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})


export class EquipmentService {

  p: EquipmentModel = null;
  observer = new BehaviorSubject(this.p);
  public subscriber = this.observer.asObservable();

  emitData(data: EquipmentModel) {
    this.observer.next(data);
  }
}
