import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GlideComponent } from 'src/app/components/carousel/glide/glide.component';

interface IIconCardItem {
  category: string;
  icon: string;
  quantity: number;
}

@Component({
  selector: 'app-icon-cards-carousel',
  templateUrl: './icon-cards-carousel.component.html',
  styleUrls: ['./icon-cards-carousel.component.scss']
})
export class IconCardsCarouselComponent implements OnInit {

  @Input() class = 'icon-cards-row';
  @ViewChild('carousel', { static: false }) carousel: GlideComponent;
  @Input() stats? : Array<any> = new Array<any>();

  dataSource: IIconCardItem[] = [
    { category: 'Players', icon: 'iconsminds-clock', quantity: 30 },
    { category: 'Groups', icon: 'iconsminds-basket-coins', quantity: 3 },
    { category: 'Coachs', icon: 'iconsminds-arrow-refresh', quantity: 4 },
    { category: 'Sessions', icon: 'iconsminds-mail-read', quantity: 25 }
  ];

  constructor() {

  }

  ngOnInit() {
  }

}
