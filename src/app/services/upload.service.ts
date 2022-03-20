import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  photoUrl: string | undefined;
  tags: any = [];
  firestoreDocumentId;

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
  uploadToCollection() {
    setTimeout(() => {
      this.firestore.collection('images')
        .add({ photoUrl: this.photoUrl, tags: this.tags });
    }, 5000);

  }

  /**
   * get the images array from firebase 
   * @returns the collection image
   */
  getImages() {
    return this
      .firestore
      .collection('images')
      .valueChanges({ idField: 'firestoreDocumentId' })
  }

  getIds() {
    this.firestore.collection<any>('images').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const firestoreDocumentId = a.payload.doc.id;
        console.log('id', firestoreDocumentId, 'data', data);
        return { firestoreDocumentId, data };
      });
    })).subscribe() 
  }
}




