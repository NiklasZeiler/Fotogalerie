import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddTagdialogComponent } from '../dialog/addtagdialog/addtagdialog.component';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-picture-content',
  templateUrl: './picture-content.component.html',
  styleUrls: ['./picture-content.component.scss']
})
export class PictureContentComponent implements OnInit {


  photoUrl: string | undefined;
  images: any = [];
  showBigImg: boolean = false;
  previewImage: boolean = false;
  currentBigImage: string = this.images[0];
  tag: string;
  tags: any = [];
  @Input() firestoreDocumentId: string;
  id: string;
  presentedImage;


  constructor(
    public uploadService: UploadService,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    // private router: Router
  ) { }

  /**
   * if the website is loaded the first time this function will save the url in the value image
   */
  ngOnInit(): void {
    this.uploadService.getImages()
      .subscribe((image) => {
        this.images = image;
      });



    this.uploadService.getIds();
  }


  /**
   * open the small image to larger image 
   * @param index number - the number of every image in images 
   */
  openImage(image: any): void {
    this.showBigImg = true;
    this.previewImage = true;
    this.currentBigImage = image.photoUrl;
    this.presentedImage = image;
    this.tags = image.tags;
  }
  

  /**
   * close big image
   */
  closeImage() {
    this.showBigImg = false;
    this.previewImage = false;

  }


  /**
   * add a tag to picture and save this in firestore
   * @param firestoreDocumentId string - give the id from document 
   * 
   */
  addTag(firestoreDocumentId: string) {
    const dialogRef = this.dialog.open(AddTagdialogComponent, {
      width: '250px',
      data: { tag: this.tag },
      
      
    });


    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

      this.tag = result;
      this.tags.push(this.tag);

      this.firestore
        .collection('images')
        .doc(firestoreDocumentId)
        .update({ tags: this.tags })
        .then(() => {
        })
    });
  }
}

