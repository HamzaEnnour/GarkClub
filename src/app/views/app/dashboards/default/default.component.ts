import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit {

  constructor(
  ) { }

  async ngOnInit() {
    //console.log('is authenicated')
    const user  =  "";
    //console.log(user) 
  }

}
