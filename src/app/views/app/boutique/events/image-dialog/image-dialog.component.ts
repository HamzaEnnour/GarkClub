import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { TerrainService } from 'src/app/shared/services/terrain.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit, AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private terrainService: TerrainService,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth : AuthenticationService
  ) { }


  imageSelected: string = "";
  selectedFile: File;
  uploadData: FormData;

  private readonly proxy = `${environment.apiUrl}/terrains/media/image-upload`;

  color = "primary";
  mode = "determinate";
  value = 50.25890809809;

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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.data["data"]["image"]) {
      this.images.forEach((el, index) => {
        if (el["src"] === this.data["data"]["image"]) {
          document.querySelector(`#img-selected-${index}`).classList.add('selected-image')
        }
      })
    } else {
      var fileSelect = document.getElementById('file-upload')
      fileSelect.addEventListener('change', this.fileSelectHandler, false);
    }
  }

  selectedImage(index) {
    this.images.forEach((el, i) => {
      if (document.querySelector(`#img-selected-${i}`).classList.contains('selected-image') && i != index) {
        document.querySelector(`#img-selected-${i}`).classList.remove('selected-image')
      }
      if (i == index) {
        if (document.querySelector(`#img-selected-${i}`).classList.contains('selected-image')) {
          document.querySelector(`#img-selected-${i}`).classList.remove('selected-image');
          this.noSelection = true;
        } else {
          document.querySelector(`#img-selected-${index}`).classList.add('selected-image');
          this.noSelection = false;
          this.imageSelected = el["src"]
        }
      }
    })

  }

  noSelection: boolean = true;

  onCancel() {
    this.dialogRef.close();
  }

  saveImageSelect() {
    if (this.data["data"]["id"]) {
      this.terrainService.updateImageSelect(this.imageSelected, this.data["data"]["id"]).subscribe(
        (res) => {
          this.dialogRef.close(res["terrain"])
        }
      )
    } else {
      this.route.parent.params.subscribe((params) => {

      })
    }
  }


  // Image Upload
  fileSelectHandler(e) {

    
    // Fetch FileList object
    if (!e.target.files) {
      return;
    }

    var files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    var fileDrag = document.getElementById('file-drag');
    e.stopPropagation();
    e.preventDefault();
    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    this.selectedFile = files[0];
    // Process all File objects
    (<HTMLInputElement>document.getElementById('file-upload')).disabled = true;
    var m = document.getElementById('messages');
    if (files[0]) {
      m.innerHTML =
        '<strong>' + encodeURI(files[0].name || "") + '</strong>';
    } else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('cancelBtn').classList.add("hidden");
      document.getElementById('uploadBtn').classList.add("hidden");
      document.getElementById('response').classList.add("hidden");
      document.getElementById('notimage').classList.add("hidden");
      document.getElementById('start').classList.remove("hidden");
      document.getElementById('bad-res').classList.add("hidden");
      (<HTMLFormElement>document.getElementById("file-upload-form")).reset();
      (<HTMLInputElement>document.getElementById('file-upload')).disabled = false;
      return;
    }

    var imageName = files[0].name || "";
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = function (e) {
        let data = e.target.result as string;
        let img = new Image()
        img.src = data
        img.onload = function () {
          resolve({
            width: img.width,
            height: img.height
          })
        }
      }
      reader.readAsDataURL(files[0])
    }).then((res) => {
      let a = res["width"];
      let b = res["height"];
      let w = a; let h = b;

      while (b !== 0) {
        let tmp = a;
        a = b;
        b = tmp % b;
      }
      // //Aspect

      // 16:9
      let ratio1 = w / a;
      let ratio2 = h / a;

      let ratio = ratio1 / ratio2;

      if (ratio < 1.5 || ratio > 1.8) {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('cancelBtn').classList.add("hidden");
        document.getElementById('uploadBtn').classList.add("hidden");
        document.getElementById('response').classList.add("hidden");
        document.getElementById('bad-res').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        (<HTMLFormElement>document.getElementById("file-upload-form")).reset();
        (<HTMLInputElement>document.getElementById('file-upload')).disabled = false;
      }
    })
    var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
    if (isGood) {
      document.getElementById('start').classList.add("hidden");
      document.getElementById('response').classList.remove("hidden");
      document.getElementById('notimage').classList.add("hidden");
      document.getElementById('bad-res').classList.add("hidden");

      document.getElementById('file-image').classList.remove("hidden");
      document.getElementById('cancelBtn').classList.remove("hidden");
      document.getElementById('uploadBtn').classList.remove("hidden");
      (<HTMLImageElement>document.getElementById('file-image')).src = URL.createObjectURL(files[0]);
    }
    else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('cancelBtn').classList.add("hidden");
      document.getElementById('uploadBtn').classList.add("hidden");
      document.getElementById('response').classList.add("hidden");
      document.getElementById('notimage').classList.remove("hidden");
      document.getElementById('start').classList.remove("hidden");
      // (<HTMLFormElement>document.getElementById("file-upload-form")).reset();
      (<HTMLInputElement>document.getElementById('file-upload')).disabled = false;
    }
  }

  cancelImage() {
    document.getElementById('file-image').classList.add("hidden");
    document.getElementById('cancelBtn').classList.add("hidden");
    document.getElementById('uploadBtn').classList.add("hidden");
    document.getElementById('response').classList.add("hidden");
    document.getElementById('notimage').classList.add("hidden");
    document.getElementById('start').classList.remove("hidden");
    document.getElementById('bad-res').classList.add("hidden");
    // (<HTMLFormElement>document.getElementById("file-upload-form")).reset();
    this.uploadPercent = 0;
    this.canSave = false;
    this.selectedFile = null;
    (<HTMLInputElement>document.getElementById('file-upload')).disabled = false;
  }


  uploadPercent = 0;
  canSave: boolean = true;

  async uploadFile(f?) {
    const myFile = (<HTMLInputElement>document.getElementById('file-upload')).files[0];

    if (myFile == null) {
      var m = document.getElementById('messages');
      m.innerHTML =
        '<strong> Veuillez réessayer de choisir une image </strong>';
      return;
    }

    var imageName = myFile.name;
    var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
    if (isGood) {
      document.getElementById('start').classList.add("hidden");
      document.getElementById('response').classList.remove("hidden");
      document.getElementById('notimage').classList.add("hidden");

      document.getElementById('file-image').classList.remove("hidden");
      document.getElementById('cancelBtn').classList.remove("hidden");
      document.getElementById('uploadBtn').classList.remove("hidden");

      this.canSave = false;
      this.selectedFile = myFile;
      const uploadData = new FormData();
      uploadData.append('terrain', myFile, imageName);


      let fileId = `${this.selectedFile.name}-${this.selectedFile.lastModified}`;
      let headers = new HttpHeaders({
        size: this.selectedFile.size.toString(),
        "x-file-id": fileId,
        name: imageName,
        'Authorization': this.auth.Token
      });

      this.http
        .get(this.proxy, { headers: headers })
        .subscribe((res: any) => {
          if (res.status === "file is present") {
            alert("File already exists. Please choose a different file.");
            return;
          }
          let uploadedBytes = res.uploaded; //GET response how much file is uploaded
          let headers2 = new HttpHeaders({
            size: this.selectedFile.size.toString(),
            "x-file-id": fileId,
            "x-start-byte": uploadedBytes.toString(),
            name: imageName,
            'Authorization': this.auth.Token
          });

          const req = new HttpRequest(
            "POST",
            this.proxy,
            this.selectedFile.slice(uploadedBytes, this.selectedFile.size + 1),
            {
              headers: headers2,
              reportProgress: true //continously fetch data from server of how much file is uploaded
            });

          this.http.request(req).subscribe(
            (res: any) => {
              if (res.type === HttpEventType.UploadProgress) {
                this.uploadPercent = Math.round((100 * res.loaded) / res.total);                
                if (this.uploadPercent >= 100) {
                  this.canSave = true;
                  this.selectedFile = null;
                }
              } else {
                if (this.uploadPercent >= 100) {
                  if (res["body"]) {
                    //this.fileNameSaved = res["body"]["fileName"];
                    this.selectedFile = null;
                    this.canSave = true;
                    let imageName = res["body"]["fileName"];
                    this.terrainService.changeImageName(this.data["data"]["id"], { imageName }).subscribe(
                      (results)=>{
                          this.notificationsService.create('Succès', "Image téléchargée avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 1450, showProgressBar: false });
                          setTimeout(() => {
                            let updates = { image: results["image"] } as Terrain;
                            this.dialogRef.close(updates)
                          }, 1500)
                      },
                      (err) => {
                        this.notificationsService.create('Erreur', "Erreur lors du téléchargement de l'image!, " + err["message"], NotificationType.Bare, { theClass: 'outline primary', timeOut: 3000, showProgressBar: false });
                      })
                  }
                  //

                }
              }
            },
            err => { 
              this.notificationsService.error("Erreur", "Une erreur a survenue lors du téléchargement de l'image")
            },
            () => {

            }
          );
        })
    }
    else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('cancelBtn').classList.add("hidden");
      document.getElementById('uploadBtn').classList.add("hidden");
      document.getElementById('response').classList.add("hidden");

      document.getElementById('notimage').classList.remove("hidden");
      document.getElementById('start').classList.remove("hidden");
      (<HTMLFormElement>document.getElementById("file-upload-form")).reset();
      this.selectedFile = null;

    }
  }





}
