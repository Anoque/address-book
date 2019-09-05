import { Injectable } from '@angular/core';

export interface Address {
  label: string;
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
  }

  addAddress(address: Address) {
    this.addresses.push(address);
  }
}
