import { Component, OnInit } from '@angular/core';
import { Address, DataService } from '../shared/data.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-address-book-list',
  templateUrl: './address-book-list.component.html',
  styleUrls: ['./address-book-list.component.css']
})
export class AddressBookListComponent implements OnInit {

  constructor(private dataService: DataService, private db: AngularFirestore) {  }

  ngOnInit() {  }

  getAddresses(): Address[] {
    return this.dataService.items;
  }
}
