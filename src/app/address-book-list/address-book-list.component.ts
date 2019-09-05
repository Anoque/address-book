import { Component, OnInit } from '@angular/core';
import { Address, DataService } from '../shared/data.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-address-book-list',
  templateUrl: './address-book-list.component.html',
  styleUrls: ['./address-book-list.component.css']
})
export class AddressBookListComponent implements OnInit {
  search: string;

  constructor(private dataService: DataService, private db: AngularFirestore) {
    this.search = '';
  }

  ngOnInit() {
    this.dataService.setTitle('Список адресов');
  }

  getAddresses(): Address[] {
    return (this.search.length > 0)
      ? this.dataService.items.filter((v) => v.label.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
      : this.dataService.items;
  }
}
