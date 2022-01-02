import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html'
})
export class ConfirmRegisterComponent implements OnInit {
  message : string;
  constructor(private _auth: AuthenticationService,
    private route : ActivatedRoute) {
    }
  
  

  ngOnInit() {
    // this.token = localStorage.getItem('__SEC-ID');
    this.route.params.subscribe((params)=>{
      const token = params["token"];
    this._auth.confirmRegister(token).subscribe(
      (res) => {
        console.log(res);
        this.message = res["message"];
      },
      (err) => {
        console.log(err);
        this.message = err["error"]["message"];
      });
    });
    }
}
