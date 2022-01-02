import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private isDarkMode = new Subject<boolean>();
  public subscriber = this.isDarkMode.asObservable();

  emitData(flag) {
    this.isDarkMode.next(flag);
  }

  getInitialMode(){
    if (localStorage.getItem(environment.themeColorStorageKey) == null) {
      console.log(environment.themeColorStorageKey);
      
      return false;
    }
    return (localStorage.getItem(environment.themeColorStorageKey) == environment.defaultColor) ? false : true;;
  }
}
