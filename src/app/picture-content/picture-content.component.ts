import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, setDoc } from '@firebase/firestore';
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


  constructor(
    public uploadService: UploadService,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
  ) { }

  /**
   * if the website is loaded the first time this function will save the url in the value image
   */
  ngOnInit(): void {

   
    
  
    this.uploadService.getImageUrl()
      .subscribe((image) => {
        this.images = image;

      });

    this.uploadService.getFirestoreDocuments();

 

  }


  /**
   * open the small image to larger image 
   * @param index number - the number of every image in images 
   */
  openImage(index: number): void {
    this.showBigImg = true;
    this.previewImage = true;
    this.currentBigImage = this.images[index].photoUrl;
  }


  /**
   * close the larger image 
   */
  closeImage() {
    this.showBigImg = false;
    this.previewImage = false;

  }


  /**
   * open dialog to add a tag to the image. Save the value to result and push it to array tags
   */
  openDialog() {
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
        .doc('665V1DG8BbjjvQxD93HO')
        .update({tags: this.tags})
        .then((test) => {
          console.log(test);
          
        });

    });


  }

}



