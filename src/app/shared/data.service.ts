import { Injectable } from '@angular/core';

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
  addresses: Address[];

  constructor() {
    this.addresses = [];
    this.setDefaultValues();
  }

  addAddress(address: Address) {
    this.addresses.push(address);
  }

  setDefaultValues() {
    this.addAddress({
      label: 'Улица',
      info: 'Большой театр',
      lat: 55.030684,
      lng: 82.924323
    });
  }
}
