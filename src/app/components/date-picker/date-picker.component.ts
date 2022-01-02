import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {

  picker24Hours = false;
  stepsMinutes = 15;

  @Input() timeChoosed;
  @Output() valueChange? : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    dateTimeAdapter: DateTimeAdapter<any>
  ) { 
    dateTimeAdapter.setLocale('fr-FR');
  }

  TimeHasChanged(event){
    this.valueChange.emit(event);
  }


}
