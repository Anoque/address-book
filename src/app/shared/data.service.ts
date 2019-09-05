import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

export interface Address {
  label: string;
  info: string;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  static readonly NOT_LOADED = 'not_loaded';
  static readonly LOADED = 'loaded';

  itemsCollection: AngularFirestoreCollection<Address>;
  keys: string[];
  items: Address[];
  loadStatus: BehaviorSubject<string>;

  constructor(private afs: AngularFirestore) {
    this.loadStatus = new BehaviorSubject<string>(DataService.NOT_LOADED);
    this.keys = [];
    this.itemsCollection = this.afs.collection('addresses');
    this.itemsCollection.valueChanges().subscribe((res: Address[]) => {
      this.items = res;
      this.getSnapshots().then((snapshots: any[]) => {
        for (let i = 0; i < snapshots.length; i++) {
          this.keys.push(snapshots[i].payload.doc.id);
        }
        this.loadStatus.next(DataService.LOADED);
        console.log(this.keys);
      });
    });
  }

  getSnapshots() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('addresses').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        });
    });
  }

  addItem(item: Address) {
    this.itemsCollection.add(item);
  }
}
