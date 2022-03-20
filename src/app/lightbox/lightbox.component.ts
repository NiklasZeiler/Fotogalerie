import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AddTagdialogComponent } from '../dialog/addtagdialog/addtagdialog.component';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @Input() presentedImage
  images: any = [];
  showBigImg: boolean = false;
  previewImage: boolean = false;
  currentBigImage: string = this.images[0];
  tag: string;
  tags: any = [];

  constructor(
    public dialog: MatDialog,
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    console.log('Test' ,this.presentedImage);
    
  }

  // closeImage() {
  //   this.showBigImg = false;
  //   this.previewImage = false;

  // }

  // openDialog(firestoreDocumentId: string) {
  //   const dialogRef = this.dialog.open(AddTagdialogComponent, {
  //     width: '250px',
  //     data: { tag: this.tag },
  //   });


  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');

  //     this.tag = result;
  //     this.tags.push(this.tag);

  //     this.firestore
  //       .collection('images')
  //       .doc(firestoreDocumentId)
  //       .update({ tags: this.tags })
  //       .then(() => {
  //         console.log('Tag are updated');

  //       })
  //   });
  // }

}
