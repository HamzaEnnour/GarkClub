import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit, OnDestroy {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    document.body.classList.add('background');
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
  }

  goBack(){
    this.router.navigateByUrl('/user/login')
  }

}
