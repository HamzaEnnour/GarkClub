import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-dialog',
  templateUrl: './stop-dialog.component.html',
  styleUrls: ['./stop-dialog.component.scss']
})
export class StopDialogComponent implements OnInit {

  msg: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Object) { }

  ngOnInit(): void {
    this.msg = this.data["msg"];
    console.log(this.data);
    
  }

}
