import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlideComponent } from 'src/app/components/carousel/glide/glide.component';
import { EquipmentModel } from 'src/app/shared/models/equipment.model';
import { EquipmentsService } from 'src/app/shared/services/equipments.service';

interface IIconCardItem {
  // category: string;
  icon: string;
  quantity: number;
  color: string;
}
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  
  @Input() class = 'icon-cards-row';
  @ViewChild('carousel', { static: false }) carousel: GlideComponent;
  @Input() stats? : Array<any> = new Array<any>();

  data: IIconCardItem[] = [
    { icon: 'flaticon-money-1', quantity: 5,color: "#77e773" },
    { icon: 'flaticon-clipboard', quantity: 40,color: "#77e773" },
    { icon: 'flaticon-speedometer', quantity: 10,color: "#77e773" },
    {  icon: 'flaticon-calendar', quantity: 4,color: "#77e773" }
  ];


  @Input() academyId: string;
  constructor(private eq: EquipmentsService,private activatedRoute: ActivatedRoute) {

  }
  
  dataSource: EquipmentModel[];
  ngOnInit() { 
    this.eq.getEquipmentByAcademyId(this.academyId).subscribe((eq: EquipmentModel[]) => {
      // console.log(eq);
      eq.forEach((el: EquipmentModel) => {
        el.icon = "flaticon-clipboard";
        el.color = "#77e773";
      })
      this.dataSource = eq;
    });
  }


}
