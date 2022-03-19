import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDatabase } from 'firebase/database';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { map, Observable, pipe, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  photoUrl: string | undefined;
  tags: any = [];
  database = getDatabase();

  constructor(
    public storage: AngularFireStorage,
    public firestore: AngularFirestore,
  ) { }

  /**
   * In this function we upload the image to firebase storage
   * If a file is choose it wil be load to storage and save url in the value photoUrl
   * @param event -  an event where we get file from input
   */
  async uploadFile(event: any): Promise<void> {
    this.photoUrl = '';

    const file = event.target.files[0];


    if (file) {
      const storage = getStorage();
      let storageRef = await ref(storage, `images/${file.name}`);
      uploadBytesResumable(storageRef, file, file).then(
        () => {
          getDownloadURL(storageRef).then((imageUrl) => {
            this.photoUrl = imageUrl;
            console.log(imageUrl);
          })
        }
      )
    }
  }

  /**
   * After 5 seconds this function will upload the photoUrl to firebase collection
   */
  upload() {
    setTimeout(() => {
      this.firestore.collection('images')
        .add({ photoUrl: this.photoUrl, tags: this.tags });
    }, 5000);

  }

  /**
   * get the url from the new image in collection 
   * @returns the id from the new image whitch is uploaded 
   */
  getImageUrl() {
    return this
      .firestore
      .collection('images')
      .valueChanges({ idField: 'id' })
  }


  getFirestoreDocuments() {
    return this
      .firestore
      .collection('images')
      .valueChanges({ idField: 'firestoreDocumentId' })

  }

}


