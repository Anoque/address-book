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
  static readonly WITHOUT_KEYS = 'without_keys';
  static readonly WITH_KEYS = 'with_keys';

  itemsCollection: AngularFirestoreCollection<Address>;
  keys: string[];
  items: Address[];
  loadStatus: BehaviorSubject<string>;
  loader: boolean;

  constructor(private afs: AngularFirestore) {
    this.loadStatus = new BehaviorSubject<string>(DataService.NOT_LOADED);
    this.keys = [];
    this.setLoader(true);
    this.itemsCollection = this.afs.collection('addresses');
    this.itemsCollection.valueChanges().subscribe((res: Address[]) => {
      this.setLoader(false);
      this.items = res;
      this.updateKeys();
    });
  }

  getSnapshots(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.afs.collection('addresses').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        });
    });
  }

  updateKeys(): void {
    this.loadStatus.next(DataService.WITHOUT_KEYS);
    this.getSnapshots().then((snapshots: any[]) => {
      this.keys = [];
      for (let i = 0; i < snapshots.length; i++) {
        this.keys.push(snapshots[i].payload.doc.id);
      }
      this.loadStatus.next(DataService.WITH_KEYS);
    });
  }

  addItem(item: Address): void {
    this.itemsCollection.add(item);
    this.updateKeys();
  }

  updateValue(id: number, address: Address): void {
    this.afs.collection('addresses').doc(this.keys[id]).set(address);
  }

  setTitle(title: string): void {
    document.title = title;
  }

  setLoader(status: boolean): void {
    this.loader = status;
  }
}
