import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addtagdialog',
  templateUrl: './addtagdialog.component.html',
  styleUrls: ['./addtagdialog.component.scss']
})
export class AddTagdialogComponent implements OnInit {

  tag: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddTagdialogComponent>,
  ) { }

  ngOnInit(): void {
  }


  /**
   * if no tag is choose you can close the dialog with this function
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

}
