import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { CreateTerrainComponent } from './create-terrain-dialog/create-terrain.component';
import { Terrain } from "src/app/shared/models/terrain.model";
import { TerrainService } from 'src/app/shared/services/terrain.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit {

  @ViewChild('createForm') createForm: NgForm;

  constructor(
    private titleService: Title,
    private terrainService: TerrainService,
    private router: Router,
    private notificationsService: NotificationsService,
    public dialog: MatDialog) { }

  loading: boolean = true;

  isMobile: boolean = false;
  adminRoot = environment.adminRoot;
  mesTerrains: Array<Terrain> = new Array<Terrain>();
  
  buttonDisabled = false;
  buttonState = '';
  selectedColor;
  terrain: Terrain;

  ngOnInit(): void {
    this.titleService.setTitle("Mes terrains | GARK");
    this.collectMesTerrains();
    this.terrain = new Terrain();
    this.terrain.address = "";
    this.terrain.name = "";
    this.terrain.duration = 90;
    
    this.isMobile = window.screen.width < 600 ? true : false;
  }
  OnError() {
  }

  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];

  images: Array<any> = [
    { src: "assets/imgs/GarkBanner1.png" },
    { src: "assets/imgs/GarkBanner2.png" },
    { src: "assets/imgs/GarkBanner3.png" },
    { src: "assets/imgs/GarkBanner4.png" },
    { src: "assets/imgs/GarkBanner5.png" },
    { src: "assets/imgs/GarkBanner6.png" },
    { src: "assets/imgs/GarkBanner7.png" },
    { src: "assets/imgs/GarkBanner8.png" },
    { src: "assets/imgs/GarkBanner9.png" },
    { src: "assets/imgs/GarkBanner10.png" },
  ]

  collectMesTerrains() {
    this.terrainService.getAll().subscribe((res) => {
      this.loading = false;
      if (res["terrain"]) {
        this.mesTerrains = res["terrain"] as Terrain[];

        this.mesTerrains.forEach((el: Terrain) => {
          el.image = this.adjustImage(el);
        })
      }
    })
  }

  backend = environment.backend;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 600 ? true : false;
  }

  adjustImage(terrain: Terrain) {
    if (!terrain.image) {
      let i = Math.floor(Math.random() * 10);
      return this.images[i].src;
    } else if (terrain.image.indexOf("assets") == -1) {
      return `${this.backend}/images/terrains/${terrain.image}`;
    }


    return `${terrain.image}`;

  }


  addMin(){
    this.terrain.duration += 30;
  }

  minusMin(){
    if(this.terrain.duration >= 90){
      this.terrain.duration -= 30;
    }
  }

  open(terrain: Terrain) {
    this.terrainService.openedTerrain = terrain;
    this.router.navigateByUrl(`${this.adminRoot}/terrains/view/${terrain._id}`);

  }

  newTerrain: Terrain;
  terrainToCreateOrUpdate: Terrain;
  isUpdating: boolean = false;
  createNew() {

    if (this.isMobile) {
      this.terrain = new Terrain();
      this.terrain.duration = 90;
      this.isUpdating = false;
      document.getElementById('normal-view').style.display = 'none';
      document.getElementById('create-terrain-mobile').style.display = 'block';
    } else {
      const dialogRef = this.dialog.open(CreateTerrainComponent, {
        width: '500px',
        data: { terrain: Terrain, update: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.newTerrain = result;
          this.collectMesTerrains();
        }
      });
    }

  }

  update(terrain: Terrain) {
    if (this.isMobile) {
      this.isUpdating = true;
      this.terrain = terrain;
      document.getElementById('normal-view').style.display = 'none';
      document.getElementById('create-terrain-mobile').style.display = 'block';
    } else {
      const dialogRef = this.dialog.open(CreateTerrainComponent, {
        width: '500px',
        data: { terrain: terrain, update: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.collectMesTerrains();
        }
      });
    }

  }

  delete(terrain: Terrain) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: { terrain: terrain }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.collectMesTerrains();
      }
    });
  }

 
  choose(color) {
    this.selectedColor = color;
  }

  onNoClick(){
    document.getElementById('normal-view').style.display = 'block';
      document.getElementById('create-terrain-mobile').style.display = 'none';
  }

  onSubmit() {
    if (!this.createForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.terrain.color = this.selectedColor
    if (!this.isUpdating) {
      this.terrainService.create(this.terrain).subscribe((res) => {
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Terrain créer", NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.collectMesTerrains();
        this.onNoClick();
      },
        (err) => {
          this.buttonDisabled = false;
          this.buttonState = '';
          this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
        })
    } else {
      this.terrainService.update(this.terrain, this.terrain._id).subscribe((res) => {
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Terrain mis à jour", NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.collectMesTerrains();
        this.onNoClick();
      },
        (err) => {
          this.buttonDisabled = false;
          this.buttonState = '';
          this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
        })
    }

  }

}
